package com.matp.follow.dto;

import com.matp.member.dto.MemberDto;

/**
 * 팔로잉, 팔로워 목록보기 호출시 반환값 DTO - 닉네임, 프로필 URL
 */
public record FollowResponseWithInfo(
        Long memberId,
        String nickname,
        String profileUrl
) {
    public static FollowResponseWithInfo of(Long memberId, String nickname, String profileUrl) {
        return new FollowResponseWithInfo(memberId ,nickname, profileUrl);
    }

    public static FollowResponseWithInfo from(MemberDto dto) {
        return new FollowResponseWithInfo(dto.memberId(), dto.nickname(), dto.profileUrl());
    }

}
