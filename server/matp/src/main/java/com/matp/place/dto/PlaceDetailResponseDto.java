package com.matp.place.dto;

import com.matp.group.entity.Group;
import com.matp.picker.entity.Picker;
import com.matp.post.dto.PlaceDetailPostDto;
import lombok.Builder;
import com.matp.place.entity.Place;
import java.util.*;
import java.util.stream.Collectors;


@Builder
public record PlaceDetailResponseDto(Long id,
                                     String tel,
                                     String img,
                                     String address,
                                     String zonecode,
                                     String name,
                                     String category,
                                     double starAvg,
                                     int[] starCount,
                                     String fiveStarProbability,
                                     int postCount,
                                     int pickCount,
                                     boolean isPick,
                                     String groupName,
                                     int groupImgIndex,
                                     double longitude,
                                     double latitude,
                                     List<PlaceDetailPostDto> posts) {
    public static PlaceDetailResponseDto of(Place place, List<PlaceDetailPostDto> posts, List<Picker> pickers, boolean isPick, Group group) {
        Object[] point = Arrays.stream(place.getPoint().substring(6, place.getPoint().length() - 1).split(" ")).map(Double::parseDouble).toArray();
        int[] starCount = new int[5];
        posts.stream().forEach(post -> starCount[post.star() - 1]++);
        return PlaceDetailResponseDto.builder()
                .id(place.getId())
                .tel(place.getTel())
                .img(!posts.isEmpty() ? posts.get((int) (Math.random() * posts.size())).thumbnailUrl() : null) // null 대신 기본이미지
                .starAvg(posts.stream().map(PlaceDetailPostDto::star).collect(Collectors.averagingDouble(Integer::doubleValue)))
                .starCount(starCount)
                .fiveStarProbability(String.format("%.1f", ((double) (starCount[4] + 1) / (posts.size() + 5) * 100)))
                .postCount(posts.size())
                .pickCount(pickers.size())
                .address(place.getAddress())
                .zonecode(place.getZonecode())
                .name(place.getName())
                .category(place.getCategory())
                .isPick(isPick)
                .groupName(isPick ? group.getName() : null)
                .groupImgIndex(isPick ? group.getGroupImgIndex() : 4)
                .longitude((Double) point[0])
                .latitude((Double) point[1])
                .posts(posts)
                .build();
    }
}
