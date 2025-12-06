package com.api.lock.user.Dto;

import jakarta.validation.constraints.NotBlank;

public record RequestUserDto(String id , @NotBlank String name) {
}
