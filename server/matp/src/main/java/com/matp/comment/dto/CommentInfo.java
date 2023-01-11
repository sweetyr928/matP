package com.matp.comment.dto;

import com.matp.post.dto.testdto.PostMemberInfo;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record CommentInfo(String commentContent, LocalDateTime commentCreatedAt, PostMemberInfo memberInfo) {
}
