package com.matp.likes.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("post_likes")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Likes {

    @Id
    private Long id;

    private Long postId;

    private Long userId;

    private int likesCheck;

    public void settingLikes(Long memberId, Long postId, int likesCheck) {
        this.userId = memberId;
        this.postId = postId;
        this.likesCheck = likesCheck;
    }
}
