package com.api.lock.user.Dto;

import jakarta.validation.constraints.NotBlank;

public record LoginUserDto(@NotBlank String email, @NotBlank String password) {
}
