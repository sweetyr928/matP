package com.matp.utils;

import org.springframework.http.server.reactive.ServerHttpRequest;

@FunctionalInterface
public interface FunctionInterface {
    Long extractId(ServerHttpRequest request);
}
