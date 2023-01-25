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
            where l.post_id = :postId and l.likes_member_id = :memberId
            """)
    Mono<Likes> findLikes(Long postId, Long memberId);

    @Modifying
    @Query("""
            insert into likes_count(count_likes, likes_post_id) values(count_likes + 1,:postId)
            ON DUPLICATE KEY UPDATE count_likes = count_likes + 1
            """)
    Mono<Void> increasePostLikesCount(Long postId);

    @Modifying
    @Query("""
            update
            likes_count lc
            set
            lc.count_likes = lc.count_likes - 1
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
            select count_likes
            from likes_count lc
            where lc.likes_post_id = :postId;
            """)
    Mono<Integer> getLikesCount(Long postId);
}
