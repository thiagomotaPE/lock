package com.api.lock.user.service;

import com.api.lock.user.Dto.CreateUserDto;
import com.api.lock.user.entity.User;
import com.api.lock.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    //Busca todos os usuarios
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            var allUsers = userRepository.findAll();
            return ResponseEntity.ok(allUsers);
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //Cria um novo usuario
    public ResponseEntity<List<User>> RegisterNewUser(CreateUserDto createUserDto) {
        verifyPassword(createUserDto.password());
        try {
            User newUser = new User(createUserDto);
            userRepository.save(newUser);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //Verifica se a senha nova tem o padrão necessario
    public void verifyPassword(String newPassword) {
        if (newPassword.length() < 8)
            throw new IllegalArgumentException("A senha deve ter pelo menos 8 caracteres");

        if (!newPassword.matches(".*[A-Z].*"))
            throw new IllegalArgumentException("A senha deve conter pelo menos 1 letra maiúscula");

        if (!newPassword.matches(".*[a-z].*"))
            throw new IllegalArgumentException("A senha deve conter pelo menos 1 letra minúscula");

        if (!newPassword.matches(".*\\d.*"))
            throw new IllegalArgumentException("A senha deve conter pelo menos 1 número");

        if (!newPassword.matches(".*[^a-zA-Z0-9].*")) {
            throw new IllegalArgumentException("A senha deve conter pelo menos 1 caractere especial");
        }
    }
}
