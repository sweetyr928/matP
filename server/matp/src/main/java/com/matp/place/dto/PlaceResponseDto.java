package com.matp.place.dto;

import com.matp.post.entity.Post;
import lombok.Builder;
import com.matp.place.entity.Place;
import java.util.*;
import java.util.stream.Collectors;


@Builder
public record PlaceResponseDto(Long id,
                               String tel,
                               String address,
                               String name,
                               double starAvg,
                               int postCount,
                               double longitude,
                               double latitude) {
    public static PlaceResponseDto of(Place place, List<Post> postStarList) {
        Object[] point = Arrays.stream(place.getPoint().substring(6,place.getPoint().length()-1).split(" ")).map(Double::parseDouble).toArray();
        return PlaceResponseDto.builder()
                .id(place.getId())
                .tel(place.getTel())
//                .img(place.getImg()) // 추가 예정
                .starAvg(postStarList.stream().map(Post::getStar).collect(Collectors.averagingDouble(Integer::doubleValue)))
                .postCount(postStarList.size())
                .address(place.getAddress())
                .name(place.getName())
                .longitude((Double) point[0])
                .latitude((Double) point[1])
                .build();
    }
}
