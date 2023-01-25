package com.matp.post.dto;

import com.matp.comment.dto.CommentInfo;
import com.matp.post.dto.testdto.PostMemberInfo;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record PostResponseWithInfo(Long id, String title,
                                   String content, int likes,
                                   String thumbnailUrl, Long placeId, LocalDateTime createdAt, LocalDateTime modifiedAt, int star,
                                   PostMemberInfo memberInfo) {
}
