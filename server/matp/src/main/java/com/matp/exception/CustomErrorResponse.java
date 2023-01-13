package com.matp.exception;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@Builder
@RequiredArgsConstructor
public class CustomErrorResponse {

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;

    public static ResponseEntity<CustomErrorResponse> error(PostNotFoundException e) {
        return ResponseEntity
                .status(e.getCustomErrorCode().getHttpStatus())
                .body(CustomErrorResponse.builder()
                        .httpStatus(e.getCustomErrorCode().getHttpStatus())
                        .code(e.getCustomErrorCode().name())
                        .message(e.getCustomErrorCode().getMessage())
                        .build());
    }

}
