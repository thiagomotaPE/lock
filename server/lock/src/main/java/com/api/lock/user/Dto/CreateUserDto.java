package com.api.lock.user.Dto;

import jakarta.validation.constraints.NotBlank;

public record CreateUserDto(@NotBlank String username, @NotBlank String email, @NotBlank String password) {
}
