package com.matp.post.repository;

import com.matp.post.dto.PostMemberSpecificInfo;
import com.matp.post.entity.Post;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface PostRepository extends ReactiveCrudRepository<Post, Long> {

    /**
     * 사용자가 입력한 keyword 를 파라미터로 한다 Keyword 를 기준으로 검색하는 쿼리
     *
     * @author 임준건
     **/
    @Query("""
            SELECT *
            FROM post p
            WHERE p.title
            LIKE CONCAT('%', :keyword, '%')
            """)
    Flux<Post> searchPostByTitleKeyword(String keyword);

    @Query("""
            SELECT *
            FROM post p
            WHERE p.content
            LIKE CONCAT('%', :keyword, '%')
            """)
    Flux<Post> searchPostByContentKeyword(String keyword);

    @Query("""
            SELECT
            p.id,
            p.title,
            p.content,
            p.likes,
            p.thumbnail_url,
            p.star,
            p.place_id,
            p.created_at,
            p.modified_at,
            m.nickname,
            m.profile_url,
            (SELECT COUNT(c.comment_content) FROM comment c WHERE c.post_id = :postId) as comment_count
            FROM post p
            INNER JOIN member m
            ON p.member_id = m.member_id
            where p.id = :postId
            """)
    Mono<PostMemberSpecificInfo> findPostWithMemberInfo(Long postId);

    @Query("""
            select
             pl.likes_check
             from post_likes pl
             where pl.post_id = :postId AND pl.likes_member_id = :memberId
            """)
    Mono<Integer> findLikeCheck(Long postId, Long memberId);

    @Query("""
            DELETE
            FROM pc,lc,pl
            USING likes_count pc
            LEFT JOIN likes_count lc
            ON pc.likes_post_id = lc.likes_post_id
            LEFT JOIN post_likes pl
            ON pl.post_id = lc.likes_post_id
            where pc.likes_post_id = :postId
            """)
    Mono<Void> PostDeleteWithCommentsLikes(Long postId);

    @Query("""
            SELECT
            id,
            star
            FROM post
            WHERE place_id = :placeId
            """)
    Flux<Post> findPlacePosts(Long placeId);

    @Query("""
            SELECT
            id,
            likes,
            thumbnail_url,
            star
            FROM post
            WHERE place_id = :placeId
            """)
    Flux<Post> findPlaceDetailPosts(Long placeId);
}
