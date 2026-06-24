package com.api.lock.user.service;

import com.api.lock.security.TokenService;
import com.api.lock.user.Dto.CreateUserDto;
import com.api.lock.user.Dto.LoginResponseDto;
import com.api.lock.user.Dto.LoginUserDto;
import com.api.lock.user.Dto.UserResponseDto;
import com.api.lock.user.entity.User;
import com.api.lock.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    TokenService tokenService;

    //Busca todos os usuarios
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        try {
            var allUsers = userRepository.findAll();
            var response = allUsers.stream()
                    .map(user -> new UserResponseDto(
                            user.getId(),
                            user.getUsername(),
                            user.getEmail(),
                            user.getRole().name()
                    ))
                    .toList();
            return ResponseEntity.ok(response);
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //Cria um novo usuario
    public ResponseEntity<Object> registerNewUser(CreateUserDto createUserDto) {
        if (userRepository.existsByUsername(createUserDto.username())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Nome de usuário já está em uso."));
        }

        if (userRepository.existsByEmail(createUserDto.email())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "E-mail já cadastrado."));
        }
        verifyPassword(createUserDto.password());
        try {
            String encryptedPassword = new BCryptPasswordEncoder().encode(createUserDto.password());
            User newUser = new User(createUserDto.username(), createUserDto.email(), encryptedPassword);
            userRepository.save(newUser);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(Map.of("message", "Conta criada com sucesso."));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //Realiza o login(autenticacao) do usuario na aplicação
    public ResponseEntity loginUser(LoginUserDto loginUserDto) {
        var emailPassword = new UsernamePasswordAuthenticationToken(loginUserDto.email(), loginUserDto.password());
        var auth = authenticationManager.authenticate(emailPassword);
        var user = (User) auth.getPrincipal();
        var token = tokenService.generateToken((User) Objects.requireNonNull(auth.getPrincipal()));

        assert user != null;
        return ResponseEntity.ok(new LoginResponseDto(user.getId(), token, user.getUsername(), user.getEmail()));
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
