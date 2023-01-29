package com.matp.utils;

import com.matp.auth.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class Function implements FunctionInterface{
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 리퀘스트 헤더에 있는 토큰을 사용하여 ID 추출
     */
    @Override
    public Long extractId(ServerHttpRequest request) {
        String bearerToken = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (bearerToken == null) return 0L;
        bearerToken = bearerToken.substring(7);
        return jwtTokenProvider.getUserId(bearerToken);
    }
}
