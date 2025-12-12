package com.api.lock.credential.Dto;

import java.util.List;

public record CredentialResponseDto(
        String id,
        String credentialName,
        String userId,
        List<FieldResponseDto> fields
) {}
