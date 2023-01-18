package com.matp.place.service;


import com.matp.place.dto.PlaceResponseDto;
import com.matp.place.repository.PlaceRepositiory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class PlaceService {
    private final PlaceRepositiory placeRepository;

    public PlaceService(PlaceRepositiory placeRepositiory) {
        this.placeRepository = placeRepositiory;
    }

    public Flux<PlaceResponseDto> getPlaces(double longitude, double latitude, double round) {
        return placeRepository.getPlaces(longitude, latitude, (int) (round * 1000)).map(PlaceResponseDto::of);
    }
}
