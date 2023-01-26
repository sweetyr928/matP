package com.matp.place.dto;

import com.matp.post.dto.PlaceDetailPostDto;
import lombok.Builder;
import com.matp.place.entity.Place;
import java.util.*;
import java.util.stream.Collectors;


@Builder
public record PlaceDetailResponseDto(Long id,
                               String tel,
                               String address,
                               String roadNameAddress,
                               String name,
                               String category,
                               double starAvg,
                               int[] starCount,
                               int postCount,
                               boolean isPick,
                               double longitude,
                               double latitude, List<PlaceDetailPostDto> postList) {
    public static PlaceDetailResponseDto of(Place place, List<PlaceDetailPostDto> postList, boolean isPick) {
        Object[] point = Arrays.stream(place.getPoint().substring(6,place.getPoint().length()-1).split(" ")).map(Double::parseDouble).toArray();
        int[] starCount = new int[5];
        postList.stream().forEach(post -> starCount[post.star()-1]++);
        return PlaceDetailResponseDto.builder()
                .id(place.getId())
                .tel(place.getTel())
//                .img(place.getImg()) // 추가 예정
                .starAvg(postList.stream().map(PlaceDetailPostDto::star).collect(Collectors.averagingDouble(Integer::doubleValue)))
                .starCount(starCount)
                .postCount(postList.size())
                .address(place.getAddress())
                .roadNameAddress(place.getRoadNameAddress())
                .name(place.getName())
                .category(place.getCategory())
                .isPick(isPick)
                .longitude((Double) point[0])
                .latitude((Double) point[1])
                .postList(postList)
                .build();
    }
}
