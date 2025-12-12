package com.api.lock.credential.Dto;

public record FieldResponseDto(
        String key,
        String label,
        String type,
        String value,
        boolean sensitive
) {}
