package com.api.lock.user.controller;

import com.api.lock.user.Dto.CreateUserDto;
import com.api.lock.user.entity.User;
import com.api.lock.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<User>> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/registerNewUser")
    public ResponseEntity<List<User>> RegisterUser(@RequestBody @Valid CreateUserDto userDto) {
        return userService.RegisterNewUser(userDto);
    }
}
