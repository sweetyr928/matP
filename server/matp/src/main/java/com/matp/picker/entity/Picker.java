package com.matp.picker.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table
@Getter
@Builder
public class Picker {
    @Id
    private Long id;

    private Long placeId;

    private Long groupId;

    private Long memberId;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    public static Picker of(Long placeId, Long groupId, Long memberId) {
        return Picker.builder()
                .placeId(placeId)
                .groupId(groupId)
                .memberId(memberId)
                .createdAt(LocalDateTime.now())
                .modifiedAt(LocalDateTime.now())
                .build();
    }
}
