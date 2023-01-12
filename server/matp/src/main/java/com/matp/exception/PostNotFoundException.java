package com.matp.exception;

import lombok.Getter;

/**
 * RuntimeException 을 상속받은 PostNotFoundException 코드 입니다.
 * Post를 찾지 못하는곳에서 쓰입니다
 * @author 임준건
 **/
@Getter
public class PostNotFoundException extends RuntimeException {

    private final CustomErrorCode customErrorCode;

    public PostNotFoundException(CustomErrorCode customErrorCode) {
        this.customErrorCode = customErrorCode;
    }
}
