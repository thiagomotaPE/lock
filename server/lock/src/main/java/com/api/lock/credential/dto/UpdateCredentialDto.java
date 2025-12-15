package com.api.lock.credential.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record UpdateCredentialDto(
        @NotBlank String id,
        @NotBlank String credentialName,
        String credentialCategoryId,
        List<FieldDto> fields
) {
    public static class FieldDto {
        public String key;
        public String label;
        public String type;
        public String value;
        public Boolean sensitive;
    }
}
