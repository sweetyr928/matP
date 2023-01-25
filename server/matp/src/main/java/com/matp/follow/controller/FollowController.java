package com.matp.follow.controller;

import com.matp.auth.jwt.JwtTokenProvider;
import com.matp.follow.dto.FollowResponseWithInfo;
import com.matp.follow.service.FollowService;
import com.matp.member.service.MemberService;
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
    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/followings/{member-id}")
    public Mono<ResponseEntity> followMember(@PathVariable("member-id") Long id,
                                             ServerHttpRequest request) {
        String email = extractEmail(request);
        return memberService.postFollow(email, id).map(ResponseEntity::ok);
    }

    @DeleteMapping("/followings/{member-id}")
    public Mono<ResponseEntity> followCancel(@PathVariable("member-id") Long id,
                                             ServerHttpRequest request) {
        String email = extractEmail(request);
        return memberService.cancelFollow(email, id).map(ResponseEntity::ok);
    }

    @GetMapping("/followings")
    public Flux<FollowResponseWithInfo> checkFollowings(ServerHttpRequest request) {
        String email = extractEmail(request);
        return followService.findFollowingByFollowerEmail(email);
    }

    @GetMapping("/followers")
    public Flux<FollowResponseWithInfo> checkFollowers(ServerHttpRequest request) {
        String email = extractEmail(request);
        return followService.findFollowerByFollowingEmail(email);
    }

    /**
     * 리퀘스트 헤더에 있는 토큰을 사용하여 이메일 추출
     */
    private String extractEmail(ServerHttpRequest request) {
        String bearerToken = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        assert bearerToken != null;
        bearerToken = bearerToken.substring(7);
        return jwtTokenProvider.getUserEmail(bearerToken);
    }

}
