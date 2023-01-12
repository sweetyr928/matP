package com.matp.exception;

import lombok.Getter;

/**
 * exception 에러 message
 * @author 임준건
 **/
@Getter
public class PostNotFoundException extends RuntimeException {

    private final CustomErrorCode customErrorCode;

    public PostNotFoundException(CustomErrorCode customErrorCode) {
        this.customErrorCode = customErrorCode;
    }
}
