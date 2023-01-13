package com.matp.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CustomErrorCode {
    POST_NOT_FOUND(HttpStatus.NO_CONTENT, "해당 게시글을 찾을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
