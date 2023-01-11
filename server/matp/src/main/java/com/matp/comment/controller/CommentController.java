package com.matp.comment.controller;

import com.matp.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/places/posts/{post-id}/comments")
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public Mono<ResponseEntity<CommentResponse>> createComment(@RequestBody Mono<SaveCommentRequest> request,
                                                               @PathVariable("post-id")Long postId) {
        Mono<ResponseEntity<CommentResponse>> map = request
                .flatMap(saveCommentRequest -> commentService.save(saveCommentRequest,postId))
                .map(commentResponse -> new ResponseEntity<>(commentResponse, HttpStatus.CREATED));
        return map;
    }
}
