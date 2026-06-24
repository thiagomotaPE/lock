package com.api.lock.user.Dto;

public record UserResponseDto(
    String id,
    String username,
    String email,
    String role
) {
}
