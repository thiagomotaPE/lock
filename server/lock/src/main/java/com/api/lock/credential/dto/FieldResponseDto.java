package com.api.lock.credential.dto;

public record FieldResponseDto(
        String key,
        String label,
        String type,
        String value,
        boolean sensitive
) {}
