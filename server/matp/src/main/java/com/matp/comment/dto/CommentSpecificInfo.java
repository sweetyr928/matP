package com.matp.comment.dto;

import java.time.LocalDateTime;

public record CommentSpecificInfo(Long id, Long feedId, Long userId, String commentContent, LocalDateTime commentCreatedAt, String nickname, String profileImg) {
}
