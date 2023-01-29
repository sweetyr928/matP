package com.matp.auth.config;

import com.matp.auth.dto.GoogleOAuth2Response;
import com.matp.auth.dto.KakaoOAuth2Response;
import com.matp.auth.dto.MemberPrincipal;
import com.matp.auth.handler.OAuthSuccessHandler;
import com.matp.auth.jwt.JwtAuthenticationFilter;
import com.matp.auth.jwt.JwtTokenProvider;
import com.matp.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcReactiveOAuth2UserService;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.userinfo.DefaultReactiveOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.ReactiveOAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.server.WebFilter;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;


@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableWebFluxSecurity
public class SecurityConfig {
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 리액티브(webflux)에서는 ServerHttpSecurity사용
     * OAuth2 로그인에 성공시 핸들러에서 토큰을 발급한다
     * 매 요청마다 검증하기위해 addfilterAt에서 HTTP_BASIC에 걸어둠
     */
    @Bean
    public SecurityWebFilterChain configure(ServerHttpSecurity http) throws Exception {
        return http
                .csrf().disable()
                .formLogin().disable()
                .httpBasic().disable()
                .cors().disable()
                .authorizeExchange(auth -> auth
                        .pathMatchers(HttpMethod.GET,"/**").permitAll()
                        .pathMatchers(HttpMethod.POST,"/**").permitAll()
                        .pathMatchers(HttpMethod.PATCH,"/**").permitAll()
                        .pathMatchers(HttpMethod.DELETE,"/**").permitAll()
                        .pathMatchers(HttpMethod.OPTIONS).permitAll()
                        .anyExchange().authenticated()
                )
                .securityContextRepository(NoOpServerSecurityContextRepository.getInstance()) // stateless
                .oauth2Login(oauth -> oauth.authenticationSuccessHandler(new OAuthSuccessHandler(jwtTokenProvider)))
                .exceptionHandling(exceptionHandlingSpec -> exceptionHandlingSpec.accessDeniedHandler((exchange, exception) -> Mono.error(new RuntimeException("접근 권한 없음"))))
                .addFilterAt(new JwtAuthenticationFilter(jwtTokenProvider), SecurityWebFiltersOrder.HTTP_BASIC)
                .build();
    }
//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of(""));
//        configuration.setAllowedHeaders(List.of("*"));
//        configuration.setAllowCredentials(true);
//        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE","OPTIONS"));
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }


    /**
     * ReactiveOAuth2UserService를 사용하여 로그인시 가져온 유저 정보를 토대로 MemberPrincipal로 변환하여 반환한다
     * 구글 로그인은 OidcUser를 반환
     * 데이터베이스에 유저 정보가 등록되어있지 않다면 추가
     */
    @Bean
    public ReactiveOAuth2UserService<OidcUserRequest, OidcUser> oidcOAuth2UserService(MemberService memberService) {
        final OidcReactiveOAuth2UserService delegate = new OidcReactiveOAuth2UserService();

        return userRequest -> {
            Mono<OidcUser> oidcUser = delegate.loadUser(userRequest);
            String registrationId = userRequest.getClientRegistration().getRegistrationId();

            return oidcUser
                    .map(OAuth2AuthenticatedPrincipal::getAttributes)
                    .map(GoogleOAuth2Response::from)
                    .map(GoogleOAuth2Response::toPrincipal)
                    .flatMap(principal -> {
                        return memberService.findMember(principal.email())
                                .switchIfEmpty(memberService.saveMember(principal.toDto(registrationId)))
                                .map(MemberPrincipal::from);
                    });
        };
    }


    /**
     * ReactiveOAuth2UserService를 사용하여 로그인시 가져온 유저 정보를 토대로 MemberPrincipal로 변환하여 반환한다
     * 카카오 로그인은 OAuth2User를 반환
     * 데이터베이스에 유저 정보가 등록되어있지 않다면 추가
     */
    @Bean
    public ReactiveOAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService(MemberService memberService) {
        final DefaultReactiveOAuth2UserService delegate = new DefaultReactiveOAuth2UserService();

        return userRequest -> {
            Mono<OAuth2User> oAuth2User = delegate.loadUser(userRequest);
            String registrationId = userRequest.getClientRegistration().getRegistrationId();

            return oAuth2User
                    .map(OAuth2AuthenticatedPrincipal::getAttributes)
                    .map(KakaoOAuth2Response::from)
                    .map(KakaoOAuth2Response::toPrincipal)
                    .flatMap(principal -> {
                        return memberService.findMember(principal.email())
                                .switchIfEmpty(memberService.saveMember(principal.toDto(registrationId)))
                                .map(MemberPrincipal::from);
                    });
        };
    }

}
