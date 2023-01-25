package com.matp.post.dto;

import com.matp.post.entity.Post;
import lombok.Builder;

@Builder
public record PlaceDetailPostDto(Long id, int likes, String thumbnailUrl, int star) {
    public static PlaceDetailPostDto of(Post matPost) {
        return PlaceDetailPostDto.builder()
                .id(matPost.getId())
                .likes(matPost.getLikes())
                .thumbnailUrl(matPost.getThumbnailUrl())
                .star(matPost.getStar())
                .build();
    }
}
