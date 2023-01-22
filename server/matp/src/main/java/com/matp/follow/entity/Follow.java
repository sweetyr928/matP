package com.matp.follow.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;


@Builder
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table
public class Follow {
    @Id private Long id;

    @Setter private String followerEmail;

    @Setter private String followingEmail;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    private Follow(String followerEmail, String followingEmail) {
        this.followerEmail = followerEmail;
        this.followingEmail = followingEmail;
    }

    public static Follow of(String followerEmail, String followingEmail) {
        return new Follow(followerEmail, followingEmail);
    }

}
