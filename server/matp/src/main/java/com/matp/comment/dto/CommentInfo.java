package com.matp.comment.dto;

import com.matp.post.dto.PostMemberInfo;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record CommentInfo(Long CommentId,String commentContent, LocalDateTime commentCreatedAt, PostMemberInfo memberInfo) {
}
