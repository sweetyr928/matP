package com.matp.place.service;


import com.matp.group.service.GroupService;
import com.matp.picker.repository.PickerRepository;
import com.matp.place.dto.*;
import com.matp.place.entity.Place;
import com.matp.place.repository.PlaceRepository;
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
    private final PlaceRepository placeRepository;
    private final PostService postService;
    private final PickerRepository pickerRepository;
    private final GroupService groupService;

    /**
     * @return Flux < PlaceResponseDto >
     * @apiNote Place들을 좌표와 반경을 기반으로 조회하는 메서드
     * @author 이종희
     */
    @Transactional(readOnly = true)
    public Flux<PlaceResponseDto> findPlaces(double longitude, double latitude, double round) {
        return mapping(placeRepository.findPlaces(longitude, latitude, (int) (round * 1000)));
    }

    @Transactional(readOnly = true)
    public Flux<PlaceSearchResponseDto> findPlaces(String search, long page, long size) {
        Flux<Place> places = (search.contains(" ")) ? placeRepository.searchPlaces(search.split(" ")[0], search.split(" ")[1]).skip(page * size).take(size) : placeRepository.searchPlaces(search).skip(page * size).take(size);
        return places.map(PlaceSearchResponseDto::of);
    }


    /**
     * @return Mono < PlaceDetailResponseDto >
     * @apiNote Place를 상세 조회하는 메서드
     * @author 이종희
     */
    @Transactional(readOnly = true)
    public Mono<PlaceDetailResponseDto> findPlaceDetail(long placeId, long memberId) {
        return placeRepository.findPlaceDetail(placeId)
                .publishOn(Schedulers.boundedElastic())
                .map(place -> {
                    var posts = postService.findPlaceDetailPosts(placeId).block();
                    var pickers = pickerRepository.findByPlaceId(placeId).collectList().block();
                    var isPick = pickers.stream().filter(picker -> picker.getMemberId() == memberId).findFirst();
                    System.out.println(isPick.isPresent());
                    if (isPick.isPresent()) {
                        var group = groupService.findById(isPick.orElseThrow().getPickerGroupId()).block();
                        return PlaceDetailResponseDto.of(place, posts, pickers, true, group);
                    }
                    return PlaceDetailResponseDto.of(place, posts, pickers, false, null);
                });
    }

    public Mono<PlaceEnrollmentResponse> registerPlaceInfo(Mono<PlaceEnrollmentRequest> placeEnrollmentRequest) {
        return placeEnrollmentRequest.map(PlaceEnrollmentRequest::toEntity)
                .flatMap(place -> placeRepository.registerPlaceInfo(place.getTel(),place.getAddress(),place.getZonecode(),place.getName(),place.getCategory()));
    }

    @Transactional(readOnly = true)
    public Flux<PlaceResponseDto> findByPlaceId(long placeId) {
        return mapping(placeRepository.findByPlaceId(placeId));
    }

    @Transactional(readOnly = true)
    public Flux<PlaceResponseDto> findByPlaceId(long placeId, int groupImgIndex) {
        return mapping(placeRepository.findByPlaceId(placeId), groupImgIndex);
    }

    private Flux<PlaceResponseDto> mapping(Flux<Place> places) {
        return places.publishOn(Schedulers.boundedElastic())
                .map(place -> {
                    var posts = postService.findPlacePosts(place.getId()).block();
                    return PlaceResponseDto.of(place, posts, 4);
                });
    }

    private Flux<PlaceResponseDto> mapping(Flux<Place> places, int groupImgIndex) {
        return places.publishOn(Schedulers.boundedElastic())
                .map(place -> {
                    var posts = postService.findPlacePosts(place.getId()).block();
                    return PlaceResponseDto.of(place, posts, groupImgIndex);
                });
    }
}
