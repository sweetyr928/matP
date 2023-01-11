package com.matp.comment.dto;

import com.matp.comment.entity.Comment;

public record PostCommentRequest(String content) {
    public Comment toEntity() {
        return Comment.builder()
                .comment_content(content)
                .build();
    }
}
