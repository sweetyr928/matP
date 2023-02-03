package com.matp.comment.dto;

import java.time.LocalDateTime;

public record CommentSpecificInfo(Long id, Long postId, Long memberId, String commentContent, LocalDateTime commentCreatedAt, String nickname, String profileUrl) {
}
