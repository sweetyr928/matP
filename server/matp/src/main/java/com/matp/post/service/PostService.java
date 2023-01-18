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
import org.springframework.data.relational.core.sql.LockMode;
import org.springframework.data.relational.repository.Lock;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final CommentService commentService;
    private final PostRepository postRepository;

    /**
     * @return Flux<PostResponse>
     * @apiNote Post 를 {@link PostRepository} 에서 페이지네이션 해오는 메서드
     * @author 임준건
     */
    @Transactional(readOnly = true)
    public Flux<PostResponse> getAll(int page,int size) {

        Flux<PostResponse> map = postRepository.findAll().skip(page * size).take(size).map(PostResponse::from);

        return map;
    }

    /**
     * @return Mono < PostResponse >
     * @apiNote 하나의 Post 를 {@link PostRepository} 에서 찾아오는 메서드
     * @author 임준건
     */
    @Transactional(readOnly = true)
    public Mono<MultiResponseDto> getPost(Long postId) {
        // TODO Member 토큰 에서 memberID 뽑아서 좋아요 post 조회시에 체킹유무까지 넘겨줘야함
        return postRepository.findPostWithMemberInfo(postId)
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
    @Transactional(readOnly = true)
    public Flux<PostResponse> findPostByKeyword(String keyword) {

        return postRepository.searchPostByKeyword(keyword)
                .map(PostResponse::from);
    }

    /**
     * @return Mono < PostResponse >
     * @apiNote PostRequest 를 {@link PostRepository} 에 저장하는 메서드
     * @author 임준건
     */
    @Transactional
    public Mono<PostResponse> save(PostRequest request) {

        Post Post = request.toEntity();
//        Post.setMemberId(2L);

        Mono<Post> save = postRepository.save(Post);

        return save.map(PostResponse::from);
    }

    /**
     * @return Mono < PostResponse >
     * @apiNote PatchPostRequest 를 {@link PostRepository} 에 저장하는 메서드
     * @author 임준건
     */
    @Transactional
    public Mono<PostResponse> update(PatchPostRequest updatePostRequest, Long postId) {
        Post updatePost = updatePostRequest.toEntity();

        return postRepository.findById(postId).flatMap(post -> postRepository.save(post.settingPost(post,updatePost))).map(PostResponse::from);
    }

    /**
     * @return Mono < Void >
     * @apiNote 특정 Post 를 {@link PostRepository} 에서 삭제하는 메서드
     * @author 임준건
     */
    @Transactional
    public Mono<Void> delete(Long postId) {

        return postRepository.findById(postId)
                .flatMap(postRepository::delete);
    }

    /**
     * @return Mono < List < Post > >
     * @apiNote Place 조회시 Post의 평점만 가져오는 메서드
     * @author 이종희
     */
    @Transactional(readOnly = true)
    public Mono<List<Post>> findPlacePosts(Long placeId) {
        return postRepository.findPlacePosts(placeId).collectList();
    }
}