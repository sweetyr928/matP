package com.matp.post.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record PostResponseWithInfo(Long id, String title,
                                   String content, int likes,
                                   String thumbnailUrl, LocalDateTime createdAt, LocalDateTime modifiedAt, int star,
                                   MemberInfo memberInfo, List<CommentInfo> comments) {
}
