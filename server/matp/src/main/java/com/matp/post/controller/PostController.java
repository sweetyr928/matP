package com.matp.post.controller;

import com.matp.post.dto.PatchPostRequest;
import com.matp.post.dto.PostRequest;
import com.matp.post.dto.PostResponse;
import com.matp.post.dto.PostResponseWithInfo;
import com.matp.post.postexception.exception.PostNotFoundException;
import com.matp.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/places/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    /**
     * 모든 게시물을 조회하는 기능
     * @author 임준건
     **/
    @GetMapping
    public Mono<ResponseEntity<List<PostResponse>>> getAllMatPosts() {

        return postService.getAll().collectList()
                .map(ResponseEntity::ok);
    }

    /**
     * 게시물 단건 조회 기능
     * @author 임준건
     **/
    @GetMapping("/{post-id}")
    public Mono<ResponseEntity<PostResponseWithInfo>> getSpecific(@PathVariable("post-id") Long postId) {

        Mono<ResponseEntity<PostResponseWithInfo>> map = postService.getPost(postId)
                .map(ResponseEntity::ok);

        return map;
    }

    /**
     * 제목,내용에 @RequestParam 으로 들어온 키워드가 포함되어있는 게시물 조회 기능
     * @author 임준건
     **/
    @GetMapping("/search")
    public Flux<PostResponse> getSearchMatPost(@RequestParam("keyword") String keyword) {

        return postService.findPostByKeyword(keyword);
    }

    /**
     * 게시물 등록 기능
     * @author 임준건
     **/
    @PostMapping
    public Mono<ResponseEntity<PostResponse>> saveMatPost(@RequestBody @Validated Mono<PostRequest> request) {

        return request
                .flatMap(postService::save)
                .map(mp -> new ResponseEntity<>(mp, HttpStatus.CREATED));
    }

    /**
     * 게시물 수정 기능
     * @author 임준건
     **/
    @PatchMapping("/{post-id}")
    public Mono<ResponseEntity<PostResponse>> updateMatPost(@RequestBody Mono<PatchPostRequest> request, @PathVariable("post-id") Long postId) {

        return request
                .flatMap((PatchPostRequest patchPostRequest) -> postService.update(patchPostRequest, postId))
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.badRequest().build());
    }

    /**
     * 게시물 삭제 기능
     * @author 임준건
     **/
    @DeleteMapping("/{post-id}")
    public Mono<ResponseEntity<Void>> deleteMatPost(@PathVariable("post-id") Long postId) {

        return postService.delete(postId)
                .map(response -> ResponseEntity.ok().<Void>build())
                .defaultIfEmpty(ResponseEntity.noContent().build());
    }

}
