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
            insert into likes_count(likes, likes_post_id) values(likes + 1,:postId)
            ON DUPLICATE KEY UPDATE likes = likes + 1
            """)
    Mono<Void> increasePostLikesCount(Long postId);

    @Modifying
    @Query("""
            update
            likes_count lc
            set
            lc.likes = lc.likes - 1
            where lc.likes_post_id = :postId
            """)
    Mono<Void> decreasePostLikesCount(Long PostId);

    @Modifying
    @Query("""
            update post p
            set
            p.likes = :count
            where p.id = :postId
            """)
    Mono<Void> updatePostLikes(Long postId,int count);

    @Query("""
            select likes
            from likes_count lc
            where lc.likes_post_id = :postId;
            """)
    Mono<Integer> getLikesCount(Long postId);
}
