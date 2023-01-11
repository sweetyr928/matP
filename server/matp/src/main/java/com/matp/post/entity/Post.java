package com.matp.post.entity;

import lombok.*;
import org.springframework.data.annotation.*;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "mat_post")
@Setter
public class Post {

    @Id
    private Long id;

    private String title;

    private String content;

    private int likes;

    private String thumbnailUrl;

    private int star;

    private Long memberId;

//    @Transient
//    private Member member;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

}
