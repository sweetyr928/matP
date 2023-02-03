package com.matp.auth.jwt;

import com.matp.auth.dto.MemberPrincipal;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;


/**
 * jwt를 생성하는 프로바이더
 * 인증에 성공하면 액세스 토큰과 리프레쉬 토큰을 생성한다
 */
@Slf4j
@Component
public class JwtTokenProvider {
    @Getter
    @Value("${jwt.key.secret}") private String jwtSecretKey;
    @Getter @Value("${jwt.access-token-expiration-minutes}") private int accessTokenExpirationMinutes;
    @Getter @Value("${jwt.refresh-token-expiration-minutes}") private int refreshTokenExpirationMinutes;
    private SecretKey secretKey;
    private static final String AUTHORITIES_KEY = "roles";

    @PostConstruct
    protected void init() {
        String secret = Base64.getEncoder().encodeToString(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
        secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String createAccessToken(MemberPrincipal principal, Date expiration) {
        Claims claims = Jwts.claims().setSubject(principal.id());
        claims.put(
                AUTHORITIES_KEY,
                principal.getAuthorities()
        );

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String createRefreshToken(MemberPrincipal principal, Date expiration) {
        return Jwts.builder()
                .setSubject(principal.id())
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public Long getUserId(String token) {
        return Long.parseLong(
                Jwts.parserBuilder()
                        .setSigningKey(secretKey)
                        .build()
                        .parseClaimsJws(token)
                        .getBody()
                        .getSubject()
        );
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);
            if (claims.getBody().getExpiration().before(Calendar.getInstance().getTime()))
                return false;
            return true;
        } catch (JwtException | IllegalArgumentException exception) {
            log.warn("Invalid JWT token");
            log.trace("Invalid JWT token trace", exception);
        }
        return false;
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        Collection<? extends GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(
                claims.get(AUTHORITIES_KEY).toString());

        MemberPrincipal principal = MemberPrincipal.of(claims.getSubject(), authorities);

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        return calendar.getTime();
    }

}
