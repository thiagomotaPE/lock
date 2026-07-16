package com.api.lock.user.Dto;

public record LoginResponseDto(String userId, String token, String username, String email) {
}
