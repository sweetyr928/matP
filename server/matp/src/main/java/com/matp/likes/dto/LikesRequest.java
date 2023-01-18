package com.matp.likes.dto;

import com.matp.likes.entity.Likes;

public record LikesRequest(int likesCheck) {

    public Likes toEntity() {
        return Likes.builder()
                .likesCheck(likesCheck)
                .build();
    }
}
