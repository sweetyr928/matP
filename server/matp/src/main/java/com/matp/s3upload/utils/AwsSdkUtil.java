package com.matp.s3upload.utils;

import lombok.experimental.UtilityClass;
import software.amazon.awssdk.core.SdkResponse;

@UtilityClass
public class AwsSdkUtil {
    public boolean isErrorSdkHttpResponse(SdkResponse sdkResponse) {
        return sdkResponse.sdkHttpResponse() == null || !sdkResponse.sdkHttpResponse().isSuccessful();
    }
}
