package com.matp.post.dto.testdto;

import com.matp.post.entity.testentity.TestMember;
import lombok.Builder;

@Builder
public record PostMemberInfo(String nickname, String profileImg) {
    public static PostMemberInfo toEntity(TestMember member) {
        return new PostMemberInfo(
                member.getNickname(),
                member.getProfileImg()
        );
    }
}
