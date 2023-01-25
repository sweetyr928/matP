package com.matp.group.dto;

import com.matp.group.entity.Group;

import java.time.LocalDateTime;

public record GroupRequestDto(String name, int groupImgIndex) {
    public Group of(Long memberId) {
        return Group.builder()
                .name(name)
                .groupImgIndex(groupImgIndex)
                .memberId(memberId)
                .createdAt(LocalDateTime.now())
                .modifiedAt(LocalDateTime.now())
                .build();
    }
}
