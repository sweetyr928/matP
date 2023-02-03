package com.matp.post.dto;

import com.matp.post.entity.Post;

public record PatchPostRequest(String title, String content, String thumbnailUrl, int star) {


    public Post toEntity() {
        return Post.builder()
                .title(title)
                .content(content)
                .thumbnailUrl(thumbnailUrl)
                .star(star)
                .build();
    }
}

