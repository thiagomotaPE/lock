package com.api.lock.credential.dto;

import com.api.lock.category.entity.Category;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record CreateCredentialDto(
        @NotBlank String credentialName,
        @NotBlank String userId,
        String category,
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