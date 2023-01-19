package com.matp.post.entity;

import com.matp.comment.entity.Comment;
import com.matp.post.dto.testdto.PostMemberInfo;
import lombok.*;
import org.springframework.data.annotation.*;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "mat_post")
public class Post {

    @Id
    private Long id;

    private String title;

    private String content;

    private int likes;

    private String thumbnailUrl;

    private int star;

    private Long memberId;

    // member 정보를 담는 record
    @Transient
    private PostMemberInfo member;

    @Transient
    private List<Comment> comments;


    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    public Post settingPost(Post post, Post updatePost) {
        this.id = post.getId();
        this.title = updatePost.getTitle();
        this.content = updatePost.getContent();
        this.thumbnailUrl = updatePost.getThumbnailUrl();
        this.star = updatePost.getStar();
        return post;
    }
    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }
}
