package com.matp.member.repository;

import com.matp.member.entity.Member;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface MemberRepository extends ReactiveCrudRepository<Member, Long> {
    Mono<Member> findByEmail(String email);

    Flux<Member> findAllByNickname(String nickname);

    Mono<Member> findByMemberId(Long memberId);

    @Query("SELECT count(member_id) FROM member")
    Mono<Long> findMemberCount();

}
