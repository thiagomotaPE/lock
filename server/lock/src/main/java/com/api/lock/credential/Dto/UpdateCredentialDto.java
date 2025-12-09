package com.api.lock.credential.Dto;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record UpdateCredentialDto(
        @NotBlank String id,
        @NotBlank String credentialName,
        @NotBlank List<FieldDto> fields
) {
    public static class FieldDto {
        public String id;
        public String key;
        public String label;
        public String type;
        public String value;
        public Boolean sensitive;
    }
}
