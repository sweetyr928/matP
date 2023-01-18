package com.matp.place.service;


import com.matp.place.dto.PlaceResponseDto;
import com.matp.place.repository.PlaceRepositiory;
import com.matp.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Service
@RequiredArgsConstructor
public class PlaceService {
    private final PlaceRepositiory placeRepository;
    private final PostService postService;

    @Transactional(readOnly = true)
    public Flux<PlaceResponseDto> findPlaces(double longitude, double latitude, double round) {
        return placeRepository.findPlaces(longitude, latitude, (int) (round * 1000))
                .publishOn(Schedulers.boundedElastic())
                .map(place -> {
                    var postList = postService.findPlacePosts(place.getId()).block();
                    return PlaceResponseDto.of(place, postList);
                });
    }
}
