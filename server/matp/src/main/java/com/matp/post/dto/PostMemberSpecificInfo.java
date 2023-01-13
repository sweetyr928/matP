package com.matp.post.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record PostMemberSpecificInfo(Long id , String title,
                                     String content, int likes,
                                     String thumbnailUrl, int star,
                                     LocalDateTime createdAt, LocalDateTime modifiedAt, String nickname, String profileImg) {
}
