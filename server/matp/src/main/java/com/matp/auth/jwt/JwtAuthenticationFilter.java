package com.matp.auth.jwt;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;


/**
 * reactive필터인 WebFilter의 구현체인 JwtAuthenticationFilter 작성
 * 헤더에 포함된 jwt를 검증하는 필터
 * 검증에 성공하면 해당 authentication을 ReactiveSecurityContextHolder에 담아서 다음 필터 체인에 넘긴다
 */
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter implements WebFilter {
    public static final String HEADER_PREFIX = "Bearer ";
    private final JwtTokenProvider provider;

    @NotNull
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        log.info("This is filter in JwtAuthenticationFilter!!!!");

        String token = resolveToken(exchange.getRequest());
        log.info("Token: {}", token);

        if (StringUtils.hasText(token) && provider.validateToken(token)) {
            log.info("Authentication Success!!");
            Authentication authentication = provider.getAuthentication(token);
            return chain.filter(exchange).contextWrite(ReactiveSecurityContextHolder.withAuthentication(authentication));
        }
        return chain.filter(exchange);
    }

    private String resolveToken(ServerHttpRequest request) {
        String bearerToken = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(HEADER_PREFIX))
            return bearerToken.substring(7);
        return null;
    }

}
