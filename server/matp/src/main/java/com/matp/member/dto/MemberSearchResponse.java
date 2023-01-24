package com.matp.member.dto;

/**
 * 닉네임으로 회원 검색시 결과 반환 DTO
 */
public record MemberSearchResponse(
        Long id,
        String nickname,
        String profileUrl,
        String memo,
        Long followers
) {
    public static MemberSearchResponse from(MemberResponse response) {
        return new MemberSearchResponse(
                response.id(),
                response.nickname(),
                response.profileUrl(),
                response.memo(),
                response.followers()
        );
    }

}
