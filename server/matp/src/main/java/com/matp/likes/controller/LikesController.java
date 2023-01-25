package com.matp.likes.controller;

import com.matp.likes.dto.LikesRequest;
import com.matp.likes.service.LikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/places/{place-id}/posts/{post-id}/likes")
@RequiredArgsConstructor
public class LikesController {

    private final LikesService likesService;

    @PostMapping
    public Mono<Void> createLikes(@RequestBody LikesRequest likeRequest,
                                  @PathVariable("post-id") Long postId) {
        //TODO member 구현시 member 정보 들어가야함
        //TODO likes post 에서 불리언처리
        Long memberId = 4L;
        return likesService.increaseLikes(likeRequest, postId, memberId);
    }

    @DeleteMapping
    public Mono<Void> deleteLikes(@PathVariable("post-id") Long postId) {
        //TODO member 구현시 member 정보 들어가야함
        Long memberId = 4L;
        return likesService.decreaseLikes(postId,memberId);
    }
}
