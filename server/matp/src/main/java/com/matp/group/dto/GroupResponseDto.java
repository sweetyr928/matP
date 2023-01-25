package com.matp.group.dto;

import com.matp.group.entity.Group;
import lombok.Builder;

@Builder
public record GroupResponseDto(Long id, String name, int groupImgIndex) {
    public static GroupResponseDto of(Group group) {
        return GroupResponseDto.builder()
                .id(group.getId())
                .name(group.getName())
                .groupImgIndex(group.getGroupImgIndex())
                .build();
    }
}
