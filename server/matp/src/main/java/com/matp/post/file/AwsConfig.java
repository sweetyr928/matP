package com.matp.post.file;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

public class AwsConfig {
    @Value("${aws.S3.AccessKey}")
    private  String accessKey;
    @Value("${aws.S3.SecretAccessKey}")
    private  String secretAccessKey;
    private  String region = "ap-northeast-2";

    @Bean
    public AmazonS3Client amazonS3Client() {
        String imaAccessKey = accessKey.trim();
        String imaSecretAccessKey = secretAccessKey.trim();
        BasicAWSCredentials basicAWSCredentials = new BasicAWSCredentials(imaAccessKey,imaSecretAccessKey);
        return (AmazonS3Client) AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(basicAWSCredentials))
                .build();
    }
}
