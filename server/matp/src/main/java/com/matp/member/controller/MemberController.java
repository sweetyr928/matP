package com.matp.member.controller;

import com.matp.auth.jwt.JwtTokenProvider;
import com.matp.member.dto.MemberPatchDto;
import com.matp.member.dto.MemberResponse;
import com.matp.member.dto.MemberSearchResponse;
import com.matp.member.repository.MemberRepository;
import com.matp.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;


/**
 * 마이페이지, memberId로 조회, 닉네임으로 검색, 회원 정보 수정 기능 담당 컨트롤러
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {
    private final MemberRepository memberRepository; // 기능 확인 위해 임시로 추가
    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 유저 정보와 팔로우 정보를 함께 가져온 후 토큰에서 email 추출하여 해당 유저 정보만 반환
     * TODO: pickerList도 함께 가져와야 함
     */
    @GetMapping("/mypage")
    public Mono<ResponseEntity<MemberResponse>> myPage(ServerHttpRequest request) {
        String email = extractEmail(request);
        return memberService.findAllWithInfo()
                .filter(member -> member.email().equals(email))
                .last()
                .map(ResponseEntity::ok);
    }

    /**
     * 유저 정보와 팔로우 정보를 함께 가져온 후 memberId로 해당 유저 정보만 반환
     * TODO: pickerList도 함께 가져와야 함
     */
    @GetMapping("/{member-id}")
    public Mono<ResponseEntity<MemberResponse>> findMember(@PathVariable("member-id") Long id) {
        return memberService.findAllWithInfo()
                .filter(member -> member.id().equals(id))
                .last()
                .map(ResponseEntity::ok);
    }

    @GetMapping
    public Flux<MemberSearchResponse> findMembers(@RequestBody Map<String, String> nicknameMap) {
        return memberService.findAllWithInfo()
                .filter(member -> member.nickname().equals(nicknameMap.get("nickname")))
                .map(MemberSearchResponse::from);
    }

    @PatchMapping
    public Mono<ResponseEntity<MemberPatchDto>> updateMember(@RequestBody MemberPatchDto patchRequest,
                                                             ServerHttpRequest request) {
        String email = extractEmail(request);
        return memberService.updateMember(email, patchRequest)
                .map(MemberPatchDto::from)
                .map(ResponseEntity::ok);
    }

    // 기능 확인 위해 임시로 추가
    @DeleteMapping("/{member-id}")
    public Mono<ResponseEntity<String>> deleteMember(@PathVariable("member-id") Long id) {
        return memberRepository.deleteById(id)
                .then(Mono.just(new ResponseEntity<>("삭제 완료", HttpStatus.NO_CONTENT)));
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
