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

    public ResponseEntity<List<User>> getAllUsers() {
        try {
            var allUsers = userRepository.findAll();
            return ResponseEntity.ok(allUsers);
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<List<User>> RegisterNewUser(CreateUserDto createUserDto) {
        try {
            User newUser = new User(createUserDto);
            userRepository.save(newUser);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
