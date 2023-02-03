package com.matp.post.dto;

import com.matp.post.entity.Post;
import jakarta.validation.constraints.NotBlank;

public record PostRequest(@NotBlank(message = "제목은 공백일 수 없습니다 !") String title, @NotBlank(message = "내용은 공백일 수 없습니다 !")String content,
                                 String thumbnailUrl, int star) {


    public Post toEntity() {
        return Post.builder()
                .title(title)
                .content(content)
                .thumbnailUrl(thumbnailUrl)
                .star(star)
                .build();
    }
}
