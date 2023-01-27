package com.matp.follow.controller;

import com.matp.auth.jwt.JwtTokenProvider;
import com.matp.follow.dto.FollowResponseWithInfo;
import com.matp.follow.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


/**
 * 팔로우 등록, 팔로우 취소, 팔로잉 목록보기, 팔로워 목록보기 기능 담당 컨트롤러
 */
@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class FollowController {
    private final FollowService followService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/followings/{member-id}")
    public Mono<ResponseEntity> followMember(@PathVariable("member-id") Long followingId,
                                             ServerHttpRequest request) {
        Long followerId = extractId(request);
        return followService.post(followerId, followingId).map(ResponseEntity::ok);
    }

    @DeleteMapping("/followings/{member-id}")
    public Mono<ResponseEntity> followCancel(@PathVariable("member-id") Long followingId,
                                             ServerHttpRequest request) {
        Long followerId = extractId(request);
        return followService.cancel(followerId, followingId).map(ResponseEntity::ok);
    }

    @GetMapping("/followings")
    public Flux<FollowResponseWithInfo> checkFollowings(ServerHttpRequest request) {
        Long id = extractId(request);
        return followService.findFollowingByFollowerId(id);
    }

    @GetMapping("/followers")
    public Flux<FollowResponseWithInfo> checkFollowers(ServerHttpRequest request) {
        Long id = extractId(request);
        return followService.findFollowerByFollowingId(id);
    }

    /**
     * 리퀘스트 헤더에 있는 토큰을 사용하여 ID 추출
     */
    private Long extractId(ServerHttpRequest request) {
        String bearerToken = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        assert bearerToken != null;
        bearerToken = bearerToken.substring(7);
        return jwtTokenProvider.getUserId(bearerToken);
    }

}
