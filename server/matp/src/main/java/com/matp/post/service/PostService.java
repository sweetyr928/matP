package com.matp.post.service;


import com.matp.comment.dto.MultiResponseDto;
import com.matp.comment.service.CommentService;
import com.matp.post.dto.PatchPostRequest;
import com.matp.post.dto.PostRequest;
import com.matp.post.dto.PostResponse;
import com.matp.post.dto.PostResponseWithInfo;
import com.matp.post.dto.testdto.PostMemberInfo;
import com.matp.post.entity.Post;
import com.matp.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Transactional
@Service
@RequiredArgsConstructor
public class PostService {
    private final CommentService commentService;
    private final PostRepository PostRepository;

    /**
     * @return Flux<PostResponse>
     * @apiNote Post 를 {@link PostRepository} 에서 페이지네이션 해오는 메서드
     * @author 임준건
     */
    public Flux<PostResponse> getAll(int page,int size) {

        Flux<PostResponse> map = PostRepository.findAll().skip(page * size).take(size).map(PostResponse::from);

        return map;
    }

    /**
     * @return Mono < PostResponse >
     * @apiNote 하나의 Post 를 {@link PostRepository} 에서 찾아오는 메서드
     * @author 임준건
     */
    @Transactional(readOnly = true)
    public Mono<MultiResponseDto> getPost(Long postId) {
        return PostRepository.findPostWithMemberInfo(postId)
                .publishOn(Schedulers.boundedElastic())
                .map(result -> {

                    var member = PostMemberInfo.builder()
                            .nickname(result.nickname())
                            .profileImg(result.profileImg())
                            .build();

                    var comments = commentService.getComments(postId).block();

                    PostResponseWithInfo postResponseWithInfo = PostResponseWithInfo.builder()
                            .id(result.id())
                            .title(result.title())
                            .content(result.content())
                            .likes(result.likes())
                            .thumbnailUrl(result.thumbnailUrl())
                            .star(result.star())
                            .createdAt(result.createdAt())
                            .modifiedAt(result.modifiedAt())
                            .memberInfo(member)
                            .build();
                    return new MultiResponseDto(postResponseWithInfo, comments);
                });
    }

    /**
     * @return Flux < PostResponse >
     * @apiNote keyword 로 Post 를 {@link PostRepository} 에서 찾아오는 메서드
     * @author 임준건
     */
    public Flux<PostResponse> findPostByKeyword(String keyword) {

        return PostRepository.searchPostByKeyword(keyword)
                .map(PostResponse::from);
    }

    /**
     * @return Mono < PostResponse >
     * @apiNote PostRequest 를 {@link PostRepository} 에 저장하는 메서드
     * @author 임준건
     */
    public Mono<PostResponse> save(PostRequest request) {

        Post Post = request.toEntity();
        Post.setMemberId(2L);

        Mono<Post> save = PostRepository.save(Post);

        return save.map(PostResponse::from);
    }

    /**
     * @return Mono < PostResponse >
     * @apiNote PatchPostRequest 를 {@link PostRepository} 에 저장하는 메서드
     * @author 임준건
     */
    public Mono<PostResponse> update(PatchPostRequest updatePostRequest, Long postId) {
        Post Post = updatePostRequest.toEntity();

        return PostRepository.findById(postId).flatMap(post -> {
            post.setTitle(Post.getTitle());
            post.setContent(Post.getContent());
            post.setThumbnailUrl(Post.getThumbnailUrl());
            post.setStar(Post.getStar());
            return PostRepository.save(post);
        }).map(PostResponse::from);
    }

    /**
     * @return Mono < Void >
     * @apiNote 특정 Post 를 {@link PostRepository} 에서 삭제하는 메서드
     * @author 임준건
     */
    public Mono<Void> delete(Long postId) {

        return PostRepository.findById(postId)
                .flatMap(PostRepository::delete);
    }
}