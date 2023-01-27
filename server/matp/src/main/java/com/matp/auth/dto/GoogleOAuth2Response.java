package com.matp.auth.dto;

import java.util.Map;

/**
 * 구글 유저 정보를 바탕으로 필요한 정보만 매핑
 */
@SuppressWarnings("unchecked")
public record GoogleOAuth2Response(
        String email,
        String nickname,
        String profileUrl
) {
    public static GoogleOAuth2Response from(Map<String, Object> attributes) {
        return new GoogleOAuth2Response(
                String.valueOf(attributes.get("email")),
                String.valueOf(attributes.get("name")),
                String.valueOf(attributes.get("picture"))
        );
    }

    public MemberPrincipal toPrincipal() {
        return MemberPrincipal.of(
                "",
                email,
                nickname,
                null,
                null,
                profileUrl,
                null
        );
    }

}
