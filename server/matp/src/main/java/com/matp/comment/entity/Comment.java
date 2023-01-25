package com.matp.comment.entity;

import com.matp.post.entity.testentity.TestMember;
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
@Table(name = "comment")
public class Comment {
    @Id
    private Long id;

    private String commentContent;

    private Long commentMemberId;
    private Long postId;

    private Long placeId;

    @Transient
    private TestMember member;

    @CreatedDate
    private LocalDateTime commentCreatedAt;

    @LastModifiedDate
    private LocalDateTime commentModifiedAt;

    public void updatePostId(Long postId) {
        this.postId = postId;
    }

    public void patchComment(String commentContent) {
        this.commentContent = commentContent;
    }

    public void settingMemberId(Long memberId) {
        this.commentMemberId = memberId;
    }
}
