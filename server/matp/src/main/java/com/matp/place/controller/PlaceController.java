package com.matp.place.controller;



import com.matp.place.dto.PlaceDetailResponseDto;
import com.matp.place.dto.PlaceEnrollmentRequest;
import com.matp.place.dto.PlaceEnrollmentResponse;
import com.matp.place.dto.PlaceResponseDto;
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
    public Flux<PlaceResponseDto> getPlaces(@RequestParam("lon") double lon, @RequestParam("lat") double lat, @RequestParam("round") double round) {
        return placeService.findPlaces(lon, lat, round);
    }

    @GetMapping("/places/{place-id}")
    public Mono<PlaceDetailResponseDto> getPlaceDetail(@PathVariable("place-id") Long placeId, ServerHttpRequest jwt) {
        return placeService.findPlaceDetail(placeId, function.extractId(jwt));
    }

    @GetMapping("/search")
    public Flux<PlaceResponseDto> searchPlaces(@RequestParam("query") String search, @RequestParam(defaultValue = "0") long page,
    @RequestParam(defaultValue = "15") long size) {
        return placeService.findPlaces(search, page, size);
    }


    @PostMapping("/places")
    public Mono<PlaceEnrollmentResponse> registerPlace(@RequestBody Mono<PlaceEnrollmentRequest> placeEnrollmentRequest) {
        return placeService.registerPlaceInfo(placeEnrollmentRequest);
    }

}
