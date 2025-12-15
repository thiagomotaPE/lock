package com.api.lock.category.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateCategoryDto(@NotBlank String categoryName) {
}
