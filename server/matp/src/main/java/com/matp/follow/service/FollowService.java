package com.matp.follow.service;

import com.matp.follow.dto.FollowResponseWithInfo;
import com.matp.follow.entity.Follow;
import com.matp.follow.repository.FollowRepository;
import com.matp.member.dto.MemberDto;
import com.matp.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@Slf4j
@Service
@RequiredArgsConstructor
public class FollowService {
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    /**
     * 팔로우 등록이 중복되어 저장되면 안되므로 데이터베이스에 확인후 저장
     */
    public Mono<Void> post(String followerEmail, String followingEmail) {
        return followRepository.findByFollowerEmailAndFollowingEmail(followerEmail, followingEmail)
                .switchIfEmpty(followRepository.save(Follow.of(followerEmail, followingEmail)))
                .then();
    }

    public Mono<Void> cancel(String followerEmail, String followingEmail) {
        return followRepository.deleteByFollowerEmailAndFollowingEmail(followerEmail, followingEmail);
    }

    /**
     * 팔로워 이메일로 팔로잉 목록 불러오기
     */
    public Flux<FollowResponseWithInfo> findFollowingByFollowerEmail(String followerEmail) {
        return followRepository.findAllByFollowerEmail(followerEmail)
                .flatMap(follow -> memberRepository.findByEmail(follow.getFollowingEmail()))
                .map(MemberDto::from)
                .map(FollowResponseWithInfo::from);
    }

    /**
     * 팔로잉 이메일로 팔로워 목록 불러오기
     */
    public Flux<FollowResponseWithInfo> findFollowerByFollowingEmail(String followingEmail) {
        return followRepository.findAllByFollowingEmail(followingEmail)
                .flatMap(follow -> memberRepository.findByEmail(follow.getFollowerEmail()))
                .map(MemberDto::from)
                .map(FollowResponseWithInfo::from);
    }

}
