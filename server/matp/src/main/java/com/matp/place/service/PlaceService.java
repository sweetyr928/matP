package com.matp.place.service;


import com.matp.place.dto.PlaceDetailResponseDto;
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

    /**
     * @return Flux < PlaceResponseDto >
     * @apiNote Place들을 좌표와 반경을 기반으로 조회하는 메서드
     * @author 이종희
     */
    @Transactional(readOnly = true)
    public Flux<PlaceResponseDto> findPlaces(double longitude, double latitude, double round) {
        return placeRepository.findPlaces(longitude, latitude, (int) (round * 1000))
                .publishOn(Schedulers.boundedElastic())
                .map(place -> {
                    var postList = postService.findPlacePosts(place.getId()).block();
                    return PlaceResponseDto.of(place, postList);
                });
    }

    // 포스트 페이지네이션 해야됨
    // 피커 매핑해서 픽했는지 여부 확인 및 피커한 사람들 수, 피커 그룹 이름 가져와야됨
    /**
     * @return Mono < PlaceDetailResponseDto >
     * @apiNote Place를 상세 조회하는 메서드
     * @author 이종희
     */
    @Transactional(readOnly = true)
    public Mono<PlaceDetailResponseDto> findPlaceDetail(Long placeId) {
        return placeRepository.findPlaceDetail(placeId)
                .publishOn(Schedulers.boundedElastic())
                .map(place -> {
                    var postList = postService.findPlaceDetailPosts(placeId).block();
                    return PlaceDetailResponseDto.of(place, postList);
                });
    }
}
