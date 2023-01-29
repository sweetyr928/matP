package com.matp.comment.controller;

import com.matp.auth.jwt.JwtTokenProvider;
import com.matp.comment.dto.CommentInfo;
import com.matp.comment.dto.CommentRequest;
import com.matp.comment.dto.CommentResponse;
import com.matp.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/places/{place-id}/posts/{post-id}/comments")
public class CommentController {
    private final CommentService commentService;
    private final JwtTokenProvider jwtTokenProvider;
    @PostMapping
    public Mono<ResponseEntity<CommentResponse>> createComment(@Validated @RequestBody Mono<CommentRequest> request,
                                                               @PathVariable("post-id")Long postId,
                                                               ServerHttpRequest jwt) {
        Long memberId = extractId(jwt);
        log.info(" 요청 : {}", " ========== 댓글 작성 완료 ========");
        Mono<ResponseEntity<CommentResponse>> map = request
                .flatMap(CommentRequest -> commentService.save(CommentRequest,postId,memberId))
                .map(commentResponse -> new ResponseEntity<>(commentResponse, HttpStatus.CREATED));
        return map;
    }
    @PatchMapping("/{comment-id}")
    public Mono<ResponseEntity<CommentResponse>> updateComment(@Validated @RequestBody Mono<CommentRequest> request,
                                                               @PathVariable("post-id") Long postId,
                                                               @PathVariable("comment-id") Long commentId,
                                                               ServerHttpRequest jwt) {
        Long memberId = extractId(jwt);
        log.info(" 요청 : {}", " ========== 댓글 수정 완료 ========");
        return request.flatMap(postCommentRequest -> commentService.updateComment(postCommentRequest, postId, commentId,memberId))
                .map(commentResponse -> new ResponseEntity<>(commentResponse, HttpStatus.OK));
    }

    @DeleteMapping("/{comment-id}")
    public Mono<ResponseEntity<Void>> deleteComment(@PathVariable("comment-id") Long commentId,
                                                    ServerHttpRequest jwt) {
        Long memberId = extractId(jwt);
        log.info(" 요청 : {}", " ========== 댓글 삭제 완료 ========");
        return commentService.deleteComment(commentId,memberId)
                .map(response -> ResponseEntity.noContent().<Void>build())
                .switchIfEmpty(Mono.just(new ResponseEntity<>(HttpStatus.NO_CONTENT)));
    }

    //TODO 특정 게시글의 댓글들 조회 ( 필요시 반영 )
    @GetMapping("/comment-reload")
    public Mono<ResponseEntity<List<CommentInfo>>> reloadComments(@PathVariable("post-id")Long postId) {
        return commentService.getComments(postId)
                .map(commentInfos -> new ResponseEntity<>(commentInfos,HttpStatus.OK));
    }
    private Long extractId(ServerHttpRequest request) {
        String bearerToken = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        assert bearerToken != null;
        bearerToken = bearerToken.substring(7);
        return jwtTokenProvider.getUserId(bearerToken);
    }
}
