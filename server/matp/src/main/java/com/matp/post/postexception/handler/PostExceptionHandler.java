package com.matp.post.postexception.handler;

import com.matp.post.postexception.exception.PostNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class PostExceptionHandler {

    /**
     * PostNoFoundException exception 이 컨트롤러단에서 발생했을때 exception 전역처리
     * @author 임준건
     **/
    @ExceptionHandler(PostNotFoundException.class)
    ResponseEntity<String> postNotFound(PostNotFoundException exception) {
        log.debug("handling exception::" + exception);
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NO_CONTENT);
    }
}
