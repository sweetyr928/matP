package com.matp.s3upload.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.http.async.SdkAsyncHttpClient;
import software.amazon.awssdk.http.nio.netty.NettyNioAsyncHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.services.s3.S3Configuration;

import java.time.Duration;

@Configuration
@RequiredArgsConstructor
public class AwsConfig {

    @Value("${aws.S3.AccessKey}")
    private  String accessKey;
    @Value("${aws.S3.SecretAccessKey}")
    private  String secretAccessKey;
    private  String region = "ap-northeast-2";


    @Bean
    public S3AsyncClient s3AsyncClient(AwsCredentialsProvider  awsCredentialsProvider) {

        return S3AsyncClient.builder()
                .httpClient(sdkAsyncHttpClient())
                .region(Region.of(region))
                .credentialsProvider(awsCredentialsProvider)
                .forcePathStyle(true)
                .serviceConfiguration(s3Configuration()).build();
    }

    private SdkAsyncHttpClient sdkAsyncHttpClient() {
        return NettyNioAsyncHttpClient.builder()
                .writeTimeout(Duration.ZERO)
                .maxConcurrency(64)
                .build();
    }
    private S3Configuration s3Configuration() {
        return S3Configuration.builder()
                .checksumValidationEnabled(false)
                .chunkedEncodingEnabled(true)
                .build();
    }

    @Bean
    AwsCredentialsProvider awsCredentialsProvider() {
        return() -> AwsBasicCredentials.create(accessKey, secretAccessKey);
    }
}
