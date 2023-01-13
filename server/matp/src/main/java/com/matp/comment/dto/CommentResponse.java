package com.matp.comment.dto;

import com.matp.comment.entity.Comment;

import java.time.LocalDateTime;

public record CommentResponse(Long id, String content, Long memberId, LocalDateTime createdAt, LocalDateTime modifiedAt) {

    public static CommentResponse from(Comment comment) {
        return new CommentResponse(
                comment.getId(),
                comment.getComment_content(),
                comment.getUserId(),
                comment.getComment_createdAt(),
                comment.getComment_modifiedAt()
        );
    }
}
