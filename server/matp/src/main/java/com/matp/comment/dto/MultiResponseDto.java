package com.matp.comment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.matp.post.dto.PostResponseWithInfo;

import java.util.List;

public class MultiResponseDto {
    @JsonProperty
    private PostResponseWithInfo postInfo;
    @JsonProperty
    private List<CommentInfo> comments;

    public MultiResponseDto(PostResponseWithInfo response, List<CommentInfo> comments) {
        this.postInfo = response;
        this.comments = comments;
    }
}
