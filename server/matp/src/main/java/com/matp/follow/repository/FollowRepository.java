package com.matp.follow.repository;

import com.matp.follow.entity.Follow;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface FollowRepository extends ReactiveCrudRepository<Follow, Long> {
    Mono<Follow> findByFollowerIdAndFollowingId(Long followerId, Long followingId);
    Mono<Void> deleteByFollowerIdAndFollowingId(Long followerId, Long followingId);

    Flux<Follow> findAllByFollowerId(Long followerId);

    Flux<Follow> findAllByFollowingId(Long followingId);

}
