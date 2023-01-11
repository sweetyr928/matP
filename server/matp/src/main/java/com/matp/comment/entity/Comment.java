package com.matp.comment.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "post_comment")
@Setter
public class Comment {
    @Id
    private Long id;

    private String comment_content;

    private Long userId;

    private Long feedId;

    @Transient
    private Member member;

    @CreatedDate
    private LocalDateTime comment_createdAt;

    @LastModifiedDate
    private LocalDateTime comment_modifiedAt;
}
