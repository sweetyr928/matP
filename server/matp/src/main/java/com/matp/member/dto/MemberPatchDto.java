package com.matp.member.dto;

/**
 * 회원 정보 수정 시 사용되는 DTO
 */
public record MemberPatchDto(
        String nickname,
        String profileUrl,
        String memo
) {
    public static MemberPatchDto of(String nickname, String profileUrl, String memo) {
        return new MemberPatchDto(nickname, profileUrl, memo);
    }

    public static MemberPatchDto from(MemberResponse response) {
        return new MemberPatchDto(
                response.nickname(),
                response.profileUrl(),
                response.memo()
        );
    }

}
