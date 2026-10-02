package com.api.lock.common.exception;

import java.time.LocalDateTime;

public record ApiErrorResponse(
        int status,
        String message,
        String error,
        String path,
        LocalDateTime timestamp
) {
}
