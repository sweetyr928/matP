package com.matp.member.controller;

import com.matp.auth.jwt.JwtTokenProvider;
import com.matp.member.dto.MemberPatchDto;
import com.matp.member.dto.MemberResponse;
import com.matp.member.dto.MemberSearchResponse;
import com.matp.member.service.MemberService;
import com.matp.utils.Function;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
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
    private final MemberService memberService;
    private final Function function;

    /**
     * 유저 정보와 필요한 다른 정보를 함께 가져온 후 토큰에서 id 추출하여 해당 유저 정보만 반환
     */
    @GetMapping("/mypage")
    public Mono<ResponseEntity<MemberResponse>> myPage(ServerHttpRequest request) {
        Long id = function.extractId(request);
        return memberService.findAllWithInfo()
                .filter(member -> member.id().equals(id))
                .last()
                .map(ResponseEntity::ok);
    }

    /**
     * 유저 정보와 필요한 다른 정보를 함께 가져온 후 memberId로 해당 유저 정보만 반환
     */
    @GetMapping("/{member-id}")
    public Mono<ResponseEntity<MemberResponse>> findMember(@PathVariable("member-id") Long id,
                                                           ServerHttpRequest request) {
        Long myId = function.extractId(request);
        return memberService.findAllWithInfo(myId,id)
                .filter(member -> member.id().equals(id))
                .last()
                .map(ResponseEntity::ok);
    }

    @GetMapping("/search/{member-nickname}")
    public Flux<MemberSearchResponse> findMembers(@PathVariable("member-nickname") String nickname) {
        return memberService.findAllWithInfo()
                .filter(member -> member.nickname().equals(nickname))
                .map(MemberSearchResponse::from);
    }

    @PatchMapping
    public Mono<ResponseEntity<MemberPatchDto>> updateMember(@RequestBody MemberPatchDto patchRequest,
                                                             ServerHttpRequest request) {
        Long id = function.extractId(request);
        return memberService.updateMember(id, patchRequest)
                .map(MemberPatchDto::from)
                .map(ResponseEntity::ok);
    }

}
