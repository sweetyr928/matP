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
     * @author 임준건
     **/
    @Query("""
            SELECT * FROM mat_post p WHERE p.title LIKE CONCAT('%', :keyword, '%') OR p.content LIKE CONCAT('%', :keyword, '%')
            """)
    Flux<Post> searchPostByKeyword(String keyword);

    @Query("""
            SELECT
            p.id,
            p.title,
            p.content,
            p.likes,
            p.thumbnail_url,
            p.star,
            p.created_at,
            p.modified_at,
            m.nickname,
            m.profile_img,
            (select count(*) from post_likes pl where pl.post_id = :postId) as likes FROM mat_post p
            INNER JOIN member m
            ON p.member_id = m.id
            where p.id = :postId
            """)
    Mono<PostMemberSpecificInfo> findPostWithMemberInfo(Long postId);

}
