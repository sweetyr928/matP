package com.matp.place.dto;

import com.matp.place.entity.Place;

public record PlaceEnrollmentRequest(String tel,
                                     String address,
                                     String roadNameAddress,
                                     String name,
                                     String category) {
    public Place toEntity() {
        return Place.builder()
                .tel(tel)
                .address(address)
                .roadNameAddress(roadNameAddress)
                .name(name)
                .category(category)
                .build();
    }
}
