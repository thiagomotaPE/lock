package com.api.lock.user.service;

import com.api.lock.user.Dto.RequestUserDto;
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
        var allUsers = userRepository.findAll();
        return ResponseEntity.ok(allUsers);
    }

    public ResponseEntity<List<User>> RegisterNewUser(RequestUserDto userDto) {
        User newUser = new User(userDto);
        userRepository.save(newUser);
        return ResponseEntity.ok().build();
    }
}
