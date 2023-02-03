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

    @Setter private Long followerId;

    @Setter private Long followingId;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    private Follow(Long followerId, Long followingId) {
        this.followerId = followerId;
        this.followingId = followingId;
    }

    public static Follow of(Long followerId, Long followingId) {
        return new Follow(followerId, followingId);
    }

}
