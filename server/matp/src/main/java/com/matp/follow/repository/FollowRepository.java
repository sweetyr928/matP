package com.matp.follow.repository;

import com.matp.follow.entity.Follow;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface FollowRepository extends ReactiveCrudRepository<Follow, Long> {
    Mono<Follow> findByFollowerEmailAndFollowingEmail(String followerEmail, String followingEmail);
    Mono<Void> deleteByFollowerEmailAndFollowingEmail(String followerEmail, String followingEmail);

    Flux<Follow> findAllByFollowerEmail(String followerEmail);

    Flux<Follow> findAllByFollowingEmail(String followingEmail);

    @Query("select count(following_email) from follow where follower_email = :followerEmail")
    Mono<Long> countAllByFollowingEmail(String followerEmail);

    @Query("select count(follower_email) from follow where following_email = :followingEmail")
    Mono<Long> countAllByFollowerEmail(String followingEmail);

    @Query("select count(following_email), count(follower_email) from follow where following_email =: memberEmail or follower_email =: memberEmail")
    Flux<Long> countAllByMemberEmail(String memberEmail);

}
