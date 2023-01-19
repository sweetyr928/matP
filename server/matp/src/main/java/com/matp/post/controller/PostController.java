package com.matp.post.controller;

import com.matp.comment.dto.MultiResponseDto;
import com.matp.exception.CustomErrorCode;
import com.matp.exception.PostNotFoundException;
import com.matp.post.dto.PatchPostRequest;
import com.matp.post.dto.PostRequest;
import com.matp.post.dto.PostResponse;
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
     * 게시물 페이지네이션
     * @parameter : page: 시작페이지, size : 게시물 개수
     * @author 임준건
     **/
    @GetMapping
    public Flux<PostResponse> getAllMatPosts(@RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "10") int size) {

        return postService.getAll(page, size);
    }

    /**
     * 게시물 단건 조회 기능
     * @author 임준건
     **/
    @GetMapping("/{post-id}")
    public Mono<ResponseEntity<MultiResponseDto>> getSpecific(@PathVariable("post-id") Long postId) {

        Mono<ResponseEntity<MultiResponseDto>> map = postService.getPost(postId)
                .map(ResponseEntity::ok)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new PostNotFoundException(CustomErrorCode.POST_NOT_FOUND))));

        return map;
    }

    /**
     * 제목에 @RequestParam 으로 들어온 키워드가 포함되어있는 게시물 조회 기능
     * @author 임준건
     **/
    @GetMapping("/search/title")
    public Flux<PostResponse> getSearchMatPostByTitle(@RequestParam("keyword") String keyword) {

        return postService.findPostByTitleKeyword(keyword)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new PostNotFoundException(CustomErrorCode.POST_NOT_FOUND))));
    }
    /**
     * 내용에 @RequestParam 으로 들어온 키워드가 포함되어있는 게시물 조회 기능
     * @author 임준건
     **/
    @GetMapping("/search/content")
    public Flux<PostResponse> getSearchMatPostByContent(@RequestParam("keyword") String keyword) {

        return postService.findPostByContentKeyword(keyword)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new PostNotFoundException(CustomErrorCode.POST_NOT_FOUND))));
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
                .map(ResponseEntity::ok);
    }

    /**
     * 게시물 삭제 기능
     * @author 임준건
     **/
    @DeleteMapping("/{post-id}")
    public Mono<ResponseEntity<Void>> deleteMatPost(@PathVariable("post-id") Long postId) {

        return postService.delete(postId)
                .map(response -> ResponseEntity.noContent().build());
    }

}
