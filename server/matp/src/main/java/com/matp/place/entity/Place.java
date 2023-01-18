package com.matp.place.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.relational.core.mapping.Table;
import java.time.LocalDateTime;

@Getter
@Builder
@Table("place")
@AllArgsConstructor
public class Place {
    @Id
    private int id;

    private String tel;

    private String address;

    private String roadNameAddress;
    private String name;

    private String point;

    private String memo;

//    private String img; // s3 추가후 컬럼 추가

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

}
