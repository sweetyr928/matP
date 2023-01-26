package com.matp.exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException{
    private final CustomErrorCode customErrorCode;

    public CustomException(CustomErrorCode customErrorCode) {
        this.customErrorCode = customErrorCode;
    }
}
