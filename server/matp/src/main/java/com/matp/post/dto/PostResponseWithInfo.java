package com.matp.post.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record PostResponseWithInfo(Long id, String title,
                                   String content, int likes,
                                   String thumbnailUrl, Long placeId, LocalDateTime createdAt, LocalDateTime modifiedAt, int star,
                                   PostMemberInfo memberInfo) {
}
