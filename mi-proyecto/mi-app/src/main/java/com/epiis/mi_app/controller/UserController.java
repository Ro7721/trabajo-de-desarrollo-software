package com.epiis.mi_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epiis.mi_app.dto.UserDto;
import com.epiis.mi_app.exepcions.ResourceNotFoundException;
import com.epiis.mi_app.exepcions.ValidationException;
import com.epiis.mi_app.model.User;
import com.epiis.mi_app.services.UserServices;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.DuplicateFormatFlagsException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    private UserServices userServices;

    @GetMapping("/getAll")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<User> users = userServices.getAllUsers();
        List<UserDto> dtos = users.stream()
                .map(userServices::mapUserToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{idPerson}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        try {
            return userServices.getUserById(id)
                    .map(user -> ResponseEntity.ok(userServices.mapUserToDto(user)))
                    .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        } catch (Exception e) {
            return buildErrorResponse("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDto userDto, BindingResult result) {
        if (result.hasErrors()) {
            return buildValidationErrorResponse(result);
        }
        try {
            User created = userServices.createUser(userDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(userServices.mapUserToDto(created));
        } catch (ValidationException | DuplicateFormatFlagsException e) {
            return buildErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return buildErrorResponse("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateUser/{idPerson}")
    public ResponseEntity<?> updateUsuary(@PathVariable String idPerson,
            @Valid @RequestBody UserDto usuaryDto, BindingResult result) {
        if (result.hasErrors()) {
            buildValidationErrorResponse(result);
        }
        try {
            User update = userServices.updateUser(idPerson, usuaryDto);
            return ResponseEntity.ok(userServices.mapUserToDto(update));
        } catch (ResourceNotFoundException e) {
            return buildErrorResponse(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (ValidationException | DuplicateFormatFlagsException e) {
            return buildErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return buildErrorResponse("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteUser/{idPerson}")
    public ResponseEntity<?> deleteUsuary(@PathVariable String idPerson) {
        try {
            userServices.deleteUser(idPerson);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return buildErrorResponse(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return buildErrorResponse("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUsers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String dni) {

        List<User> users = userServices.searchUsers(name, dni);
        List<UserDto> userDtos = users.stream()
                .map(userServices::mapUserToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(userDtos);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return buildErrorResponse("Email y contraseña son requeridos", HttpStatus.BAD_REQUEST);
        }

        boolean authenticated = userServices.authenticate(email, password);

        if (authenticated) {
            return userServices.getUserByEmail(email)
                    .map(user -> {
                        Map<String, Object> response = new HashMap<>();
                        response.put("authenticated", true);
                        response.put("user", userServices.mapUserToDto(user));
                        return ResponseEntity.ok(response);
                    })
                    .orElse(buildErrorResponse("Usuario no encontrado", HttpStatus.NOT_FOUND));
        } else {
            return buildErrorResponse("Credenciales inválidas", HttpStatus.UNAUTHORIZED);
        }
    }

    private ResponseEntity<Map<String, Object>> buildErrorResponse(String message, HttpStatus status) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("message", message);
        errorResponse.put("status", status.value() + " " + status.getReasonPhrase());
        return ResponseEntity.status(status).body(errorResponse);
    }

    private ResponseEntity<Map<String, Object>> buildValidationErrorResponse(BindingResult result) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("message", "Errores de validación");
        errorResponse.put("status", HttpStatus.BAD_REQUEST.value());

        Map<String, String> errors = result.getFieldErrors().stream()
                .collect(Collectors.toMap(
                        FieldError::getField,
                        FieldError::getDefaultMessage,
                        (existing, replacement) -> existing));

        errorResponse.put("errors", errors);
        return ResponseEntity.badRequest().body(errorResponse);
    }
}
