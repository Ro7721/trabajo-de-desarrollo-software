package com.epiis.apirsDS2025.controller;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.epiis.apirsDS2025.model.User;
import com.epiis.apirsDS2025.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @PostMapping("/insert")
    public User newUser(@RequestBody User user) {
        return Objects.requireNonNull(userRepository.save(user));
    }
    @GetMapping("/users")
    List<User> getAllUsers(){
        return userRepository.findAll();
    }
    @DeleteMapping("/delete/{id}")
    void deleteAllUsers(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
