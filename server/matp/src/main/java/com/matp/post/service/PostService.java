package com.matp.post.service;


import com.matp.post.dto.PatchPostRequest;
import com.matp.post.dto.PostRequest;
import com.matp.post.dto.PostResponse;
import com.matp.post.entity.Post;
import com.matp.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository PostRepository;

    /**
     * @return Flux<PostResponse>
     * @apiNote 모든 Post 를 {@link PostRepository} 에서 찾아오는 메서드
     * @author 임준건
     */
    public Flux<PostResponse> getAll() {

        return PostRepository.findAll()
                .map(PostResponse::from);
    }

    /**
     * @return Mono < PostResponse >
     * @apiNote 하나의 Post 를 {@link PostRepository} 에서 찾아오는 메서드
     * @author 임준건
     */
    public Mono<PostResponse> getOne(Long PostId) {

        return PostRepository.findById(PostId)
                .map(PostResponse::from);
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
            PostResponse.from(post);
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

//    public Mono<List<PostUserSpecificInfo>> getPost() {
//
//        Mono<List<PostUserSpecificInfo>> listMono = customRepository.findPostByMember().collectList();
//        return listMono;
//    }
}