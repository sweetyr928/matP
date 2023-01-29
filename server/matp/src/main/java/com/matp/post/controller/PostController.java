package com.matp.post.controller;

import com.matp.auth.jwt.JwtTokenProvider;
import com.matp.comment.dto.MultiResponseDto;
import com.matp.exception.CustomErrorCode;
import com.matp.exception.CustomException;
import com.matp.post.dto.PatchPostRequest;
import com.matp.post.dto.PostRequest;
import com.matp.post.dto.PostResponse;
import com.matp.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequestMapping({"/places/posts","/places/{place-id}/posts"})
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 게시물 페이지네이션
     * @parameter : page: 시작페이지, size : 게시물 개수
     * @author 임준건
     **/
    @GetMapping
    public Flux<PostResponse> getAllMatPosts(@RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "30") int size) {

        return postService.getAll(page, size);
    }

    /**
     * 게시물 단건 조회 기능
     * @author 임준건
     **/
    @GetMapping("/{post-id}")
    public Mono<ResponseEntity<MultiResponseDto>> getSpecific(@PathVariable("post-id") Long postId,
                                                              ServerHttpRequest jwt) {
        // TODO token 에서 member 빼오기
        // 조회기능이라 pathVariable placeId 필요없음
        Long memberId = extractId(jwt);
        Mono<ResponseEntity<MultiResponseDto>> map = postService.getPost(postId,memberId)
                .map(ResponseEntity::ok)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new CustomException(CustomErrorCode.POST_NOT_FOUND))));

        log.info(" 요청 : {}", " ========== 게시물 조회 기능 ========");

        return map;
    }

    /**
     * 제목에 @RequestParam 으로 들어온 키워드가 포함되어있는 게시물 조회 기능
     * @author 임준건
     **/
    @GetMapping("/search/title")
    public Flux<PostResponse> getSearchMatPostByTitle(@RequestParam("keyword") String keyword) {

        return postService.findPostByTitleKeyword(keyword)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new CustomException(CustomErrorCode.POST_NOT_FOUND))));
    }
    /**
     * 내용에 @RequestParam 으로 들어온 키워드가 포함되어있는 게시물 조회 기능
     * @author 임준건
     **/
    @GetMapping("/search/content")
    public Flux<PostResponse> getSearchMatPostByContent(@RequestParam("keyword") String keyword) {

        return postService.findPostByContentKeyword(keyword)
                .switchIfEmpty(Mono.defer(() -> Mono.error(new CustomException(CustomErrorCode.POST_NOT_FOUND))));
    }

    /**
     * 게시물 등록 기능
     * @author 임준건
     **/
    @PostMapping
    public Mono<ResponseEntity<PostResponse>> saveMatPost(@RequestBody @Validated Mono<PostRequest> request, @PathVariable("place-id") Long placeId,
                                                          ServerHttpRequest jwt) {
        Long memberId = extractId(jwt);
        log.info(" 요청 : {}", " ========== 게시물 작성 완료 ========");
        return request
                .flatMap(postRequest -> postService.save(postRequest,placeId,memberId))
                .map(mp -> new ResponseEntity<>(mp, HttpStatus.CREATED));
    }

    /**
     * 게시물 수정 기능
     * @author 임준건
     **/
    //TODO 검증로직 작성해야함
    @PatchMapping("/{post-id}")
    public Mono<ResponseEntity<PostResponse>> updateMatPost(@RequestBody Mono<PatchPostRequest> request, @PathVariable("post-id") Long postId,
                                                            @PathVariable("place-id") Long placeId,
                                                            ServerHttpRequest jwt) {
        Long memberId = extractId(jwt);
        log.info(" 요청 : {}", " ========== 게시물 수정 완료 ========");
        return request
                .flatMap((PatchPostRequest patchPostRequest) -> postService.update(patchPostRequest, postId,memberId))
                .map(ResponseEntity::ok);
    }

    /**
     * 게시물 삭제 기능
     * @author 임준건
     **/
    @DeleteMapping("/{post-id}")
    public Mono<ResponseEntity<Void>> deleteMatPost(@PathVariable("post-id") Long postId,
                                                    ServerHttpRequest jwt) {
        Long memberId = extractId(jwt);
        log.info(" 요청 : {}", " ========== 게시물 삭제 완료 ========");
        return postService.delete(postId,memberId)
                .map(response -> ResponseEntity.noContent().build());
    }

    private Long extractId(ServerHttpRequest request) {
        String bearerToken = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        assert bearerToken != null;
        bearerToken = bearerToken.substring(7);
        return jwtTokenProvider.getUserId(bearerToken);
    }
}
