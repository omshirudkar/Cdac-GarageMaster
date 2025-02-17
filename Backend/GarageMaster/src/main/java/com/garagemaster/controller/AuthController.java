package com.garagemaster.controller;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.garagemaster.dto.LoginRequest;
import com.garagemaster.dto.LoginResponse;
import com.garagemaster.dto.UserDto;
import com.garagemaster.exception.AccountInActiveException;
import com.garagemaster.exception.ResourceNotFoundExceptionClass;
import com.garagemaster.service.IUserService;
import java.util.Map;

import jakarta.mail.MessagingException;

@CrossOrigin("**")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private IUserService userService;

    // User Registration
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto) 
            throws UnsupportedEncodingException, MessagingException {
        try {
            Boolean isRegistered = userService.register(userDto);
            if (isRegistered) {
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(Map.of("message", "User Registered Successfully"));
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "User Registration Failed"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Registration Error", "message", e.getMessage()));
        }
    }

    // User Login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            LoginResponse loginResponse = userService.login(loginRequest);
            return ResponseEntity.ok(loginResponse);
        } catch (AccountInActiveException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Account Inactive", "message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Login Error", "message", e.getMessage()));
        }
    }

    // Get All Roles  
    @GetMapping("/getRoles")
    public ResponseEntity<?> getRoles() {
        try {
            return ResponseEntity.ok(userService.getAllRoles());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Fetching Roles Failed", "message", e.getMessage()));
        }
    }

    // Delete User
    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        try {
            boolean isDeleted = userService.deleteUserById(userId);
            if (isDeleted) {
                return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "Delete Failed", "message", "Failed to delete user."));
            }
        } catch (ResourceNotFoundExceptionClass e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User Not Found", "message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Delete Error", "message", e.getMessage()));
        }
    }
}
