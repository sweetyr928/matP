package com.matp.comment.service;

import com.matp.comment.dto.CommentInfo;
import com.matp.comment.dto.CommentResponse;
import com.matp.comment.dto.PostCommentRequest;
import com.matp.comment.entity.Comment;
import com.matp.comment.repository.CommentRepository;
import com.matp.post.dto.testdto.PostMemberInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    public Mono<List<CommentInfo>> getComments(Long postId) {
        Mono<List<CommentInfo>> listMono = commentRepository.findPost_CommentWithMember(postId).map(commentSpecificInfo -> {

            var memberInfo = PostMemberInfo.builder()
                    .nickname(commentSpecificInfo.nickname())
                    .profileImg(commentSpecificInfo.profileImg())
                    .build();

            return CommentInfo.builder()
                    .CommentId(commentSpecificInfo.id())
                    .commentContent(commentSpecificInfo.commentContent())
                    .commentCreatedAt(commentSpecificInfo.commentCreatedAt())
                    .memberInfo(memberInfo)
                    .build();
        }).collectList();

        return listMono;
    }

    public Mono<CommentResponse> save(PostCommentRequest saveCommentRequest, Long postId) {

        Comment postComment = saveCommentRequest.toEntity();
        postComment.setUserId(3L);
        postComment.setFeedId(postId);
        Mono<Comment> save = commentRepository.save(postComment);
        Mono<CommentResponse> map = save.map(CommentResponse::from);
        return map;
    }

}
