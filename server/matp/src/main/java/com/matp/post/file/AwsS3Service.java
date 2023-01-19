package com.matp.post.file;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.matp.post.exception.NoImageException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AwsS3Service implements ImageUploadService {

    private final AmazonS3Client amazonS3Client;
    @Value("${aws.S3.bucket}")
    private String bucketName;

    @Override
    public String StoreImage(FilePart file) {
        validateFileExists(file);
        String fileName = createFileName(file.filename());
        String trim = fileName.trim();


        file.content().map(DataBuffer::asInputStream)
                .map(inputStream -> amazonS3Client.putObject(new PutObjectRequest(bucketName, trim, inputStream, new ObjectMetadata())
                        .withCannedAcl(CannedAccessControlList.PublicRead)))
                .subscribe();

        return amazonS3Client.getUrl(bucketName, fileName).toString();
    }


    private String createFileName(String filename) {
        return UUID.randomUUID().toString().concat(getFileExtension(filename));
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }

    private void validateFileExists(FilePart filePart) {
        if (filePart.toString().isBlank()) {
            throw new NoImageException();
        }
    }
}