package com.matp.post.file;

import org.springframework.http.codec.multipart.FilePart;

public interface ImageUploadService {
    String StoreImage(FilePart img);
}
