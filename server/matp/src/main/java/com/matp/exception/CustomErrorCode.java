package com.matp.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CustomErrorCode {
    UPLOAD_FAILED(HttpStatus.NOT_FOUND,"잘못된 형식의 파일입니다."),
    NO_IMAGE(HttpStatus.NOT_FOUND, "해당 이미지를 찾을 수 없습니다."),
    POST_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 게시글을 찾을 수 없습니다."),

    NOT_ALLOWED_MEMBER_ID(HttpStatus.UNAUTHORIZED,"작성한 회원만 접근할 수 있습니다."),
    GROUP_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 그룹을 찾을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
