package com.api.lock.user.service;

import com.api.lock.security.TokenService;
import com.api.lock.user.Dto.CreateUserDto;
import com.api.lock.user.Dto.LoginResponseDto;
import com.api.lock.user.Dto.LoginUserDto;
import com.api.lock.user.entity.User;
import com.api.lock.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    TokenService tokenService;

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
    public ResponseEntity<List<User>> registerNewUser(CreateUserDto createUserDto) {
        verifyPassword(createUserDto.password());
        try {
            String encryptedPassword = new BCryptPasswordEncoder().encode(createUserDto.password());
            User newUser = new User(createUserDto.username(), createUserDto.email(), encryptedPassword);
            userRepository.save(newUser);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //Realiza o login(autenticacao) do usuario na aplicação
    public ResponseEntity loginUser(LoginUserDto loginUserDto) {
        var emailPassword = new UsernamePasswordAuthenticationToken(loginUserDto.email(), loginUserDto.password());
        var auth = authenticationManager.authenticate(emailPassword);
        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDto(token));
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
