package com.matp.s3upload.service;

import com.matp.s3upload.utils.FileUtils;
import com.matp.s3upload.entity.UploadStatus;
import com.matp.s3upload.dto.FileResponse;
import com.matp.s3upload.utils.AwsProperties;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import software.amazon.awssdk.core.async.AsyncRequestBody;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.services.s3.model.*;

import java.nio.ByteBuffer;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class AwsS3FileStorageService {

    private final S3AsyncClient s3AsyncClient;
    private final AwsProperties s3ConfigProperties;

    public Mono<FileResponse> uploadObject(FilePart filePart) {

        String realFilename = filePart.filename();
        String filename = createFileName(realFilename);
        Map<String, String> metadata = Map.of("filename", filename);

        MediaType mediaType = ObjectUtils.defaultIfNull(filePart.headers().getContentType(), MediaType.MULTIPART_FORM_DATA);

        CompletableFuture<CreateMultipartUploadResponse> s3AsyncClientMultipartUpload = s3AsyncClient
                .createMultipartUpload(CreateMultipartUploadRequest.builder()
                        .contentType(mediaType.toString())
                        .key(filename)
                        .metadata(metadata)
                        .bucket(s3ConfigProperties.getS3BucketName())
                        .build());

        UploadStatus uploadStatus = new UploadStatus(Objects.requireNonNull(filePart.headers().getContentType()).toString(), filename);

        return Mono.fromFuture(s3AsyncClientMultipartUpload)
                .flatMapMany(response -> {

                    FileUtils.checkSdkResponse(response);
                    uploadStatus.setUploadId(response.uploadId());

                    return filePart.content();
                })
                .bufferUntil(dataBuffer -> {

                    uploadStatus.addBuffered(dataBuffer.readableByteCount());

                    if (uploadStatus.getBuffered() >= s3ConfigProperties.getMultipartMinPartSize()) {

                        uploadStatus.setBuffered(0);

                        return true;
                    }

                    return false;
                })
                .map(FileUtils::dataBufferToByteBuffer)
                .flatMap(byteBuffer -> uploadPartObject(uploadStatus, byteBuffer))
                .onBackpressureBuffer()
                .reduce(uploadStatus, (status, completedPart) -> {
                    (status).getCompletedParts().put(completedPart.partNumber(), completedPart);

                    return status;
                })
                .flatMap(uploadStatus1 -> completeMultipartUpload(uploadStatus))
                .map(response -> {

                    FileUtils.checkSdkResponse(response);

                    return new FileResponse(filename, response.location(), uploadStatus.getContentType());
                });
    }

    /**
     * S3 멀티파트 업로드  파트
     */
    private Mono<CompletedPart> uploadPartObject(UploadStatus uploadStatus, ByteBuffer buffer) {
        final int partNumber = uploadStatus.getAddedPartCounter();


        CompletableFuture<UploadPartResponse> uploadPartResponseCompletableFuture = s3AsyncClient.uploadPart(UploadPartRequest.builder()
                        .bucket(s3ConfigProperties.getS3BucketName())
                        .key(uploadStatus.getFileKey())
                        .partNumber(partNumber)
                        .uploadId(uploadStatus.getUploadId())
                        .contentLength((long) buffer.capacity())
                        .build(),
                AsyncRequestBody.fromPublisher(Mono.just(buffer)));

        return Mono
                .fromFuture(uploadPartResponseCompletableFuture)
                .map(uploadPartResult -> {
                    FileUtils.checkSdkResponse(uploadPartResult);
                    return CompletedPart.builder()
                            .eTag(uploadPartResult.eTag())
                            .partNumber(partNumber)
                            .build();
                });
    }

    private Mono<CompleteMultipartUploadResponse> completeMultipartUpload(UploadStatus uploadStatus) {


        CompletedMultipartUpload multipartUpload = CompletedMultipartUpload.builder()
                .parts(uploadStatus.getCompletedParts().values())
                .build();

        return Mono.fromFuture(s3AsyncClient.completeMultipartUpload(CompleteMultipartUploadRequest.builder()
                .bucket(s3ConfigProperties.getS3BucketName())
                .uploadId(uploadStatus.getUploadId())
                .multipartUpload(multipartUpload)
                .key(uploadStatus.getFileKey())
                .build()));
    }

    private String createFileName(String filename) {
        return UUID.randomUUID().toString().concat(getFileExtension(filename));
    }

    private String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }
}
