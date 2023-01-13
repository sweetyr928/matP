package com.matp.post.dto;

import com.matp.post.entity.Post;

import java.time.LocalDateTime;

public record PostResponse(Long id, String title, String content, int likes, String thumbnailUrl,
                              LocalDateTime createdAt, LocalDateTime modifiedAt, long star, Long memberId) {

    public static PostResponse from(Post matPost) {
        return new PostResponse(
                matPost.getId(),
                matPost.getTitle(),
                matPost.getContent(),
                matPost.getLikes(),
                matPost.getThumbnailUrl(),
                matPost.getCreatedAt(),
                matPost.getModifiedAt(),
                matPost.getStar(),
                matPost.getMemberId());
    }
}