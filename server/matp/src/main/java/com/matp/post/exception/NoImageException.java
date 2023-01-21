package com.matp.post.exception;

import com.matp.exception.CustomErrorCode;

public class NoImageException extends RuntimeException{
    public NoImageException() {
        super(CustomErrorCode.NO_IMAGE.getMessage());
    }
}
