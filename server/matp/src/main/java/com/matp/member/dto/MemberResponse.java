package com.matp.member.dto;

import com.matp.member.entity.Member;
import com.matp.post.dto.SimplePostResponse;

import java.util.List;

/**
 * 팔로우 정보를 포함하는 반환 DTO
 * TODO: 피커정보도 포함되어야 함
 */
public record MemberResponse(
        Long id,
        String email,
        String nickname,
        String birthday,
        String profileUrl,
        Integer gender,
        String memo,
        Long followers,
        Long followings,
        List<SimplePostResponse> postInfos
) {
    public static MemberResponse from(MemberDto dto) {
        return new MemberResponse(
                dto.memberId(),
                dto.email(),
                dto.nickname(),
                dto.birthday(),
                dto.profileUrl(),
                dto.gender(),
                dto.memo(),
                null,
                null,
                null
        );
    }

    public static MemberResponse from(Member entity) {
        return new MemberResponse(
                entity.getMemberId(),
                entity.getEmail(),
                entity.getNickname(),
                entity.getBirthday(),
                entity.getProfileUrl(),
                entity.getGender(),
                entity.getMemo(),
                entity.getFollowers(),
                entity.getFollowings(),
                entity.getPostInfos()
        );
    }

}
