package com.matp.place.dto;

import com.matp.place.entity.Place;
import lombok.Builder;

import java.util.Arrays;

@Builder
public record PlaceSearchResponseDto(Long id,
                                     String address,
                                     String name,
                                     double longitude,
                                     double latitude) {
    public static PlaceSearchResponseDto of(Place place) {
        Object[] point = Arrays.stream(place.getPoint().substring(6,place.getPoint().length()-1).split(" ")).map(Double::parseDouble).toArray();
        return PlaceSearchResponseDto.builder()
                .id(place.getId())
                .address(place.getAddress())
                .name(place.getName())
                .longitude((Double) point[0])
                .latitude((Double) point[1])
                .build();
    }
}
