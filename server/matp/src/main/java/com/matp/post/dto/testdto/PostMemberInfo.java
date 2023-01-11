package com.matp.post.dto.testdto;

import lombok.Builder;

@Builder
public record PostMemberInfo(String nickname, String profileImg) {
    public static PostMemberInfo toEntity(Member member) {
        return new PostMemberInfo(
                member.getNickname(),
                member.getProfileImg()
        );
    }
}
