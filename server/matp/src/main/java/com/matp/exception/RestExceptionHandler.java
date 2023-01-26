package com.matp.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import reactor.core.publisher.Mono;

import java.util.Objects;

@RestControllerAdvice
@Slf4j
class RestExceptionHandler {

    /**
     * exception 이 컨트롤러단에서 발생했을때 exception 전역처리
     * @author 임준건
     **/
    @ExceptionHandler(CustomException.class)
    Mono<ResponseEntity<CustomErrorResponse>> errorHandling(CustomException exception) {

        log.debug("handling exception:" + exception);

        return Mono.just(Objects.requireNonNull(ResponseEntity.status(HttpStatus.NO_CONTENT).body(CustomErrorResponse.error(exception)).getBody()));
    }
}

