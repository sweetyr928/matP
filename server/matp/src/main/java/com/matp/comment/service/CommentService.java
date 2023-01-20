package com.matp.comment.service;

import com.matp.comment.dto.CommentInfo;
import com.matp.comment.dto.CommentRequest;
import com.matp.comment.dto.CommentResponse;
import com.matp.comment.entity.Comment;
import com.matp.comment.repository.CommentRepository;
import com.matp.post.dto.testdto.PostMemberInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    @Transactional(readOnly = true)
    public Mono<List<CommentInfo>> getComments(Long postId) {
        Mono<List<CommentInfo>> listMono = commentRepository.findPostCommentWithMember(postId).map(commentSpecificInfo -> {

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
    @Transactional
    public Mono<CommentResponse> save(CommentRequest saveCommentRequest, Long postId) {

        Comment postComment = saveCommentRequest.toEntity();
        postComment.settingMemberId(3L);
        postComment.updatePostId(postId);
        Mono<Comment> save = commentRepository.save(postComment);
        Mono<CommentResponse> map = save.map(CommentResponse::from);
        return map;
    }
    @Transactional
    public Mono<CommentResponse> updateComment(CommentRequest saveCommentRequest, Long postId, Long commentId) {
        Comment patchRequestComment = saveCommentRequest.toEntity();

        return commentRepository.findById(commentId)
                .flatMap(comment -> {
                    comment.patchComment(patchRequestComment.getCommentContent());
                    return commentRepository.save(comment);
                })
                .map(CommentResponse::from);

    }
    @Transactional
    public Mono<Void> deleteComment(Long commentId) {
        return commentRepository.deleteById(commentId);
    }

}
