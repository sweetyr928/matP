package com.matp.member.dto;

import com.matp.group.dto.GroupResponseDto;
import com.matp.member.entity.Member;
import com.matp.post.dto.SimplePostResponse;

import java.util.List;
import java.util.Set;

/**
 * 팔로우 정보, 포스트 정보, 피커 그룹 정보를 포함하는 반환 DTO
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
        List<SimplePostResponse> postInfos,
        Set<GroupResponseDto> pickerGroupInfos
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
                entity.getPostInfos(),
                entity.getPickerGroupInfos()
        );
    }

}
