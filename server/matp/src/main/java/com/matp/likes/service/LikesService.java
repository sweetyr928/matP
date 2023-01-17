package com.matp.likes.service;


import com.matp.likes.dto.LikesRequest;
import com.matp.likes.entity.Likes;
import com.matp.likes.repository.LikesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class LikesService {

    private final LikesRepository likesRepository;


    @Transactional
    public Mono<Void> increaseLikes(LikesRequest likeRequest, Long postId, Long memberId) {

        Likes likes = likeRequest.toEntity();
        likes.settingLikes(memberId,postId,likeRequest.likesCheck());

        return likesRepository.save(likes)
                .then(likesRepository.increasePostLikesCount(postId))
                .then(likesRepository.getLikesCount(postId)
                        .flatMap(countInteger -> likesRepository.updatePostLikes(postId, countInteger.intValue()))
                );

    }
    @Transactional
    public Mono<Void> decreaseLikes(Long postId, Long memberId) {
        //TODO 멤버 검증로직 들어가야함 .

        return likesRepository.findLikes(postId, memberId).flatMap(likesRepository::delete)
                .then(likesRepository.decreasePostLikesCount(postId))
                .then(likesRepository.getLikesCount(postId)
                        .flatMap(countInteger -> likesRepository.updatePostLikes(postId, countInteger.intValue()))
                );
    }
}
