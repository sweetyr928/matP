package com.matp.place.controller;



import com.matp.place.dto.PlaceDetailResponseDto;
import com.matp.place.dto.PlaceEnrollmentRequest;
import com.matp.place.dto.PlaceEnrollmentResponse;
import com.matp.place.dto.PlaceResponseDto;
import com.matp.place.service.PlaceService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/places")
public class PlaceController {
    private final PlaceService placeService;

    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    @GetMapping
    public Flux<PlaceResponseDto> getPlaces(@RequestParam("lon") double lon, @RequestParam("lat") double lat, @RequestParam("round") double round) {
        return placeService.findPlaces(lon, lat, round);
    }

    @GetMapping("{place-id}")
    public Mono<PlaceDetailResponseDto> getPlaceDetail(@PathVariable("place-id") Long placeId) {
        return placeService.findPlaceDetail(placeId);
    }

    @PostMapping
    public Mono<PlaceEnrollmentResponse> registerPlace(@RequestBody Mono<PlaceEnrollmentRequest> placeEnrollmentRequest) {
        return placeService.registerPlaceInfo(placeEnrollmentRequest);
    }
}
