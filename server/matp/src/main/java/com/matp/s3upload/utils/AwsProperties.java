package com.matp.s3upload.utils;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
@Data
@Component
public class AwsProperties {



    @Value("${aws.S3.AccessKey}")
    private  String accessKey;

    @Value("${aws.S3.SecretAccessKey}")
    private  String secretAccessKey;

    private String region = "ap-northeast-2";

    @Value("${aws.S3.bucket}")
    private String s3BucketName;

    @Value("${aws.S3.multipart-min-part-size}")
    private int multipartMinPartSize;
}
