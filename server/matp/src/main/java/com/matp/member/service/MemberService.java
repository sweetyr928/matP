package com.matp.member.service;

import com.matp.follow.dto.FollowResponseWithInfo;
import com.matp.follow.service.FollowService;
import com.matp.group.entity.Group;
import com.matp.group.repository.GroupRepository;
import com.matp.member.dto.MemberDto;
import com.matp.member.dto.MemberPatchDto;
import com.matp.member.dto.MemberResponse;
import com.matp.member.entity.Member;
import com.matp.member.repository.MemberCustomRepository;
import com.matp.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;


@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberCustomRepository memberCustomRepository;
    private final GroupRepository groupRepository;
    @Transactional(readOnly = true)
    public Flux<MemberResponse> findAllWithInfo(Long myId, Long id) {
        return memberCustomRepository.findWithInfo(myId, id);
    }
    @Transactional(readOnly = true)
    public Flux<MemberResponse> findAllWithInfo2() {
        return memberCustomRepository.findWithInfo2();
    }

    @Transactional(readOnly = true)
    public Mono<MemberDto> findMemberById(Long memberId) {
        return memberRepository.findById(memberId)
                .map(MemberDto::from);
    }

    @Transactional(readOnly = true)
    public Mono<MemberDto> findMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .map(MemberDto::from);
    }

    @Transactional(readOnly = true)
    public Mono<MemberDto> findMember(String email) {
        return memberRepository.findByEmail(email)
                .map(MemberDto::from);
    }

    @Transactional(readOnly = true)
    public Flux<MemberResponse> findMembers(String nickname) {
        return memberRepository.findAllByNickname(nickname)
                .map(MemberDto::from)
                .map(MemberResponse::from);
    }

    @Transactional
    public Mono<MemberDto> saveMember(String email, String nickname, String birthday, String profileUrl, Integer gender, String registrationId) {
        Member member = Member.of(email, nickname, birthday, profileUrl, gender, registrationId);
        Mono<Member> savedMember = memberRepository.save(member);

        return savedMember.map(MemberDto::from);
    }

    @Transactional
    public Mono<MemberDto> saveMember(MemberDto dto) {
        Member member = dto.toEntity();

        return memberRepository.save(member)
                .publishOn(Schedulers.boundedElastic())
                .map( member1 ->{
                    Group group = Group.builder().groupImgIndex(3).name("기본 그룹").memberId(member1.getMemberId()).build();
                    groupRepository.save(group).subscribe();
                    return MemberDto.from(member1);
                });

    }

    @Transactional
    public Mono<MemberResponse> updateMember(Long id, MemberPatchDto request) {
        return memberRepository.findById(id)
                .flatMap(member -> {
                    if (request.nickname() != null) member.setNickname(request.nickname());
                    if (request.profileUrl() != null) member.setProfileUrl(request.profileUrl());
                    if (request.memo() != null) member.setMemo(request.memo());

                    return memberRepository.save(member);
                })
                .map(MemberDto::from)
                .map(MemberResponse::from);
    }

    @Transactional(readOnly = true)
    public Mono<Void> verifyExistEmail(String email) {
        return memberRepository.findByEmail(email)
                .flatMap(findMember -> {
                    if (findMember != null) {
                        return Mono.error(new IllegalArgumentException("해당 유저가 존재함"));
                    }
                    return Mono.empty();
                });
    }

    @Transactional(readOnly = true)
    public Mono<Void> verifyExistId(Long memberId) {
        return memberRepository.findById(memberId)
                .switchIfEmpty(Mono.error(new IllegalArgumentException("해당 유저가 존재하지 않음")))
                .then();
    }

    private Mono<Long> getMemberId(String email) {
        return memberRepository.findByEmail(email).map(Member::getMemberId);
    }

    private Mono<String> getMemberEmail(Long id) {
        return memberRepository.findById(id).map(Member::getEmail);
    }

}
