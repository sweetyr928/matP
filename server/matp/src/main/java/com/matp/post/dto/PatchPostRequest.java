package com.matp.post.dto;

import com.matp.post.entity.Post;

public record PatchPostRequest(String title, String content, int star, String thumbnailUrl) {


    public Post toEntity() {
        return Post.builder()
                .title(title)
                .content(content)
                .star(star)
                .thumbnailUrl(thumbnailUrl)
                .build();
    }
}

