package com.matp.post.dto;


import lombok.Builder;

@Builder
public record PostMemberInfo(String nickname, String profileImg) {
}
