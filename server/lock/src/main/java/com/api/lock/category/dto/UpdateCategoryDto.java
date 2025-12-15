package com.api.lock.category.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateCategoryDto(@NotBlank String newCategoryName) {
}
