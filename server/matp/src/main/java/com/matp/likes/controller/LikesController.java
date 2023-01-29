package com.matp.likes.controller;

import com.matp.auth.jwt.JwtTokenProvider;
import com.matp.likes.dto.LikesRequest;
import com.matp.likes.service.LikesService;
import com.matp.utils.Function;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
@Slf4j
@RestController
@RequestMapping("/places/{place-id}/posts/{post-id}/likes")
@RequiredArgsConstructor
public class LikesController {

    private final LikesService likesService;
    private final Function function;
    @PostMapping
    public Mono<Void> createLikes(@RequestBody LikesRequest likeRequest,
                                  @PathVariable("post-id") Long postId,
                                  ServerHttpRequest jwt) {
        Long memberId = function.extractId(jwt);
        log.info(" 요청 : {}", " ========== 좋아요 요청 완료 ========");
        return likesService.increaseLikes(likeRequest, postId, memberId);
    }

    @DeleteMapping
    public Mono<Void> deleteLikes(@PathVariable("post-id") Long postId,
                                  ServerHttpRequest jwt) {
        Long memberId = function.extractId(jwt);
        log.info(" 요청 : {}", " ========== 좋아요 취소 완료 ========");
        return likesService.decreaseLikes(postId,memberId);
    }

}
