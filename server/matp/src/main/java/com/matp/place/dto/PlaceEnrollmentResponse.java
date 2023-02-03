package com.matp.place.dto;

import com.matp.place.entity.Place;
import lombok.Builder;

@Builder
public record PlaceEnrollmentResponse(Long id,
                               String tel,
                               String address,
                               String zonecode,
                               String name,
                               String category) {
    public static PlaceEnrollmentResponse of(Place place) {
        return PlaceEnrollmentResponse.builder()
                .id(place.getId())
                .tel(place.getTel())
                .address(place.getAddress())
                .zonecode(place.getZonecode())
                .name(place.getName())
                .category(place.getCategory())
                .build();
    }
}
