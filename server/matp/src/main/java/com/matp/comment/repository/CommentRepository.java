package com.matp.comment.repository;


import com.matp.comment.dto.CommentSpecificInfo;
import com.matp.comment.entity.Comment;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface CommentRepository extends ReactiveCrudRepository<Comment, Long> {


    @Query("""
            SELECT
            c.id,
            c.post_id,
            c.comment_member_id,
            c.comment_content,
            c.comment_created_at,
            m.nickname,
            m.profile_url
            FROM comment c
            INNER JOIN member m
            ON c.comment_member_id = m.member_id
            where c.post_id = :postId
           """)
    Flux<CommentSpecificInfo> findPostCommentWithMember(Long PostId);

}
