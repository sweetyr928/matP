package com.matp.comment.dto;

import com.matp.comment.entity.Comment;

import java.time.LocalDateTime;

public record CommentResponse(Long id, String content, Long memberId, LocalDateTime createdAt, LocalDateTime modifiedAt) {

    public static CommentResponse from(Comment comment) {
        return new CommentResponse(
                comment.getId(),
                comment.getCommentContent(),
                comment.getCommentMemberId(),
                comment.getCommentCreatedAt(),
                comment.getCommentModifiedAt()
        );
    }
}
