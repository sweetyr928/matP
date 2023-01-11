package com.matp.post.postexception.exception;

public class PostNotFoundException extends RuntimeException{

    /**
     * exception 에러 message
     * @author 임준건
     **/
    public PostNotFoundException(Long id) {
        super("게시물 번호 : " + id +" 번 게시물을 찾을 수가 없습니다 !! ");
    }
}
