package com.matp.comment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.matp.post.dto.PostResponseWithInfo;

import java.util.List;

public class MultiResponseDto {
    @JsonProperty
    private PostResponseWithInfo postInfo;
    @JsonProperty
    private List<CommentInfo> comments;

    @JsonProperty
    private boolean isLikesCheck;

    public MultiResponseDto(PostResponseWithInfo response, List<CommentInfo> comments, Integer likesCheck) {
        this.postInfo = response;
        this.comments = comments;
        this.isLikesCheck = likesCheck != null;
    }
}
