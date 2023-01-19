package com.matp.post.file;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/upload")
public class FileUploadController {
    private final AwsS3Service awsS3Service;

    @Value("${aws.S3.bucket}")
    private String bucketName;
    public FileUploadController(AwsS3Service awsS3Service) {
        this.awsS3Service = awsS3Service;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Mono<String> upload(@RequestPart("file") Mono<FilePart> filePartMono) {

        return filePartMono.map(awsS3Service::StoreImage);

    }
}
