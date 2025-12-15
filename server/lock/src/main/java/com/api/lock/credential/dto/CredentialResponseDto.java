package com.api.lock.credential.dto;

import java.util.List;

public record CredentialResponseDto(
        String id,
        String credentialName,
        String userId,
        String categoryId,
        String categoryName,
        List<FieldResponseDto> fields
) {}
