package com.matp.likes.controller;

import com.matp.auth.jwt.JwtTokenProvider;
import com.matp.likes.dto.LikesRequest;
import com.matp.likes.service.LikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/places/{place-id}/posts/{post-id}/likes")
@RequiredArgsConstructor
public class LikesController {

    private final LikesService likesService;
    private final JwtTokenProvider jwtTokenProvider;
    @PostMapping
    public Mono<Void> createLikes(@RequestBody LikesRequest likeRequest,
                                  @PathVariable("post-id") Long postId,
                                  ServerHttpRequest jwt) {
        Long memberId = extractId(jwt);
        return likesService.increaseLikes(likeRequest, postId, memberId);
    }

    @DeleteMapping
    public Mono<Void> deleteLikes(@PathVariable("post-id") Long postId,
                                  ServerHttpRequest jwt) {
        Long memberId = extractId(jwt);
        return likesService.decreaseLikes(postId,memberId);
    }

    private Long extractId(ServerHttpRequest request) {
        String bearerToken = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        assert bearerToken != null;
        bearerToken = bearerToken.substring(7);
        return jwtTokenProvider.getUserId(bearerToken);
    }
}
