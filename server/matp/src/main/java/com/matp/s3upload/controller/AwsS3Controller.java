package com.matp.s3upload.controller;

import com.matp.s3upload.service.AwsS3FileStorageService;
import com.matp.s3upload.utils.FileUtils;
import com.matp.s3upload.dto.SuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RestController
@RequestMapping("/upload")
@Validated
public class AwsS3Controller {
    private final AwsS3FileStorageService fileStorageService;

    @PostMapping
    public Mono<SuccessResponse> upload(@RequestPart("file") Mono<FilePart> filePart) {
        return filePart
                .map(file -> {
                    FileUtils.filePartValidator(file);
                    return file;
                })
                .flatMap(fileStorageService::uploadObject)
                .map(fileResponse -> new SuccessResponse(fileResponse, "이미지 업로드 성공 !"));
    }
}
