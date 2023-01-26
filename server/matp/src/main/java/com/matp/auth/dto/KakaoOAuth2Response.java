package com.matp.auth.dto;

import java.util.Map;

/**
 * 카카오 유저 정보를 바탕으로 필요한 정보만 매핑
 */
@SuppressWarnings("unchecked")
public record KakaoOAuth2Response(
        Long id,
        KakaoAccount kakaoAccount
) {
    public record KakaoAccount(
            Profile profile,
            String email,
            String birthday,
            Integer gender
    ) {
        public record Profile(String nickname, String profileUrl) {
            public static Profile from(Map<String, Object> attributes) {
                String profileUrl = attributes.get("profile_image_url") == null ? null : String.valueOf(attributes.get("profile_image_url"));
                return new Profile(
                        String.valueOf(attributes.get("nickname")),
                        profileUrl
                );
            }
        }

        public static KakaoAccount from(Map<String, Object> attributes) {
            Integer gender;
            if (attributes.get("gender") == null) gender = null;
            else if (attributes.get("gender").equals("male")) gender = 1;
            else gender = 0;

            String email = attributes.get("email") == null ? "" : String.valueOf(attributes.get("email"));
            String birthday = attributes.get("birthday") == null ? null : String.valueOf(attributes.get("birthday"));

            return new KakaoAccount(
                    Profile.from((Map<String, Object>) attributes.get("profile")),
                    email,
                    birthday,
                    gender
            );
        }

        public String nickname() { return this.profile().nickname(); }
    }

    public static KakaoOAuth2Response from(Map<String, Object> attributes) {
        return new KakaoOAuth2Response(
                Long.valueOf(String.valueOf(attributes.get("id"))),
                KakaoAccount.from((Map<String, Object>) attributes.get("kakao_account"))
        );
    }

    public MemberPrincipal toPrincipal() {
        return MemberPrincipal.of(
                "",
                kakaoAccount.email,
                kakaoAccount.profile.nickname,
                kakaoAccount.birthday,
                kakaoAccount.gender,
                kakaoAccount.profile.profileUrl,
                null
        );
    }

    public String email() { return this.kakaoAccount().email(); }
    public String nickname() { return this.kakaoAccount().nickname(); }

}
