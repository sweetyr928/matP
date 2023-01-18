package com.matp.place.dto;

import lombok.Builder;
import com.matp.place.entity.Place;
import java.util.Arrays;


@Builder
public record PlaceResponseDto(int id, String tel, String address, String name,
                               double longitude, double latitude) {
    public static PlaceResponseDto of(Place place) {
        Object[] point = Arrays.stream(place.getPoint().substring(6,place.getPoint().length()-1).split(" ")).map(Double::parseDouble).toArray();
        return PlaceResponseDto.builder()
                .id(place.getId())
                .tel(place.getTel())
//                .img(place.getImg()) // 추가 예정
                .address(place.getAddress())
                .name(place.getName())
                .longitude((Double) point[0])
                .latitude((Double) point[1])
                .build();
    }
}
