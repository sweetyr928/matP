package com.matp.place.controller;



import com.matp.place.dto.*;
import com.matp.place.service.PlaceService;
import com.matp.utils.Function;
import lombok.RequiredArgsConstructor;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class PlaceController {
    private final PlaceService placeService;
    private final Function function;

    @GetMapping("/places")
    public Flux<PlaceSearchResponseDto> getPlaces(@RequestParam("longitude") double longitude, @RequestParam("latitude") double latitude, @RequestParam(defaultValue = "1") double round, @RequestParam(defaultValue = "0") long page,
                                                  @RequestParam(defaultValue = "15") long size) {
        return placeService.findPlaces(longitude, latitude, round, page, size);
    }

    @GetMapping("/places/{place-id}")
    public Mono<PlaceDetailResponseDto> getPlaceDetail(@PathVariable("place-id") Long placeId, ServerHttpRequest jwt) {
        return placeService.findPlaceDetail(placeId, function.extractId(jwt));
    }

    @GetMapping("/search")
    public Flux<PlaceSearchResponseDto> searchPlaces(@RequestParam("query") String search, @RequestParam(defaultValue = "0") long page,
                                                     @RequestParam(defaultValue = "15") long size) {
        return placeService.findPlaces(search, page, size);
    }


    @PostMapping("/places")
    public Mono<PlaceEnrollmentResponse> registerPlace(@RequestBody Mono<PlaceEnrollmentRequest> placeEnrollmentRequest) {
        return placeService.registerPlaceInfo(placeEnrollmentRequest);
    }

}
