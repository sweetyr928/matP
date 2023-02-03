package com.matp.post.exception;

import com.matp.exception.CustomErrorCode;

public class UploadFailedException extends RuntimeException{
    public UploadFailedException() {
        super(CustomErrorCode.UPLOAD_FAILED.getMessage());
    }
}
