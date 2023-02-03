package com.matp.member.repository;

import com.matp.member.entity.Member;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface MemberRepository extends ReactiveCrudRepository<Member, Long> {
    Mono<Member> findByEmail(String email);

    Flux<Member> findAllByNickname(String nickname);

    @Query("""
            select id
            from follow fl
            where  fl.follower_id = :myId  AND fl.following_id = :followingId
            """)
    Mono<Integer> getFollowCheck(Long myId, Long followingId);

}
