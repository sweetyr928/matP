package com.matp.likes.repository;

import com.matp.likes.entity.Likes;
import org.springframework.data.r2dbc.repository.Modifying;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface LikesRepository extends ReactiveCrudRepository<Likes, Long> {
    @Query("""
            select
            l.id
            from post_likes l
            where l.post_id = :postId and l.user_id = :memberId
            """)
    Mono<Likes> findLikes(Long postId, Long memberId);

    @Modifying
    @Query("""
            update
            post p
            set
            p.likes = p.likes + 1
            where p.id = :postId
            """)
    Mono<Void> increasePostLikesCount(Long postId);

    @Modifying
    @Query("""
            update
            post p
            set
            p.likes = p.likes - 1
            where p.id = :postId
            """)
    Mono<Void> decreasePostLikesCount(Long PostId);
}
