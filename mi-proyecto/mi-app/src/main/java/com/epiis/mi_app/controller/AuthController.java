package com.epiis.mi_app.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.epiis.mi_app.dto.LoginRequest;
import com.epiis.mi_app.dto.LoginResponse;
import com.epiis.mi_app.model.User;
import com.epiis.mi_app.security.CustomUserDetails;
import com.epiis.mi_app.security.JwtService;
import com.epiis.mi_app.services.UserServices;
import com.epiis.mi_app.dto.UserDto;

import jakarta.validation.Valid;

/**
 * Controlador de autenticación.
 * Maneja login, registro y consulta del usuario autenticado.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserServices userServices;

    public AuthController(AuthenticationManager authenticationManager,
            JwtService jwtService,
            UserServices userServices) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userServices = userServices;
    }

    /**
     * POST /api/auth/login
     * Autentica al usuario y retorna tokens JWT.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            // 1. Autenticar con Spring Security (usa CustomUserDetailsService + BCrypt)
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()));

            // 2. Obtener los detalles del usuario autenticado
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            User user = userDetails.getUser();

            // 3. Generar claims adicionales (rol, id)
            Map<String, Object> extraClaims = new HashMap<>();
            extraClaims.put("role", user.getRole().name());
            extraClaims.put("userId", user.getIdPerson());
            extraClaims.put("fullName", user.getFirstName() + " " + user.getSurname());

            // 4. Generar tokens
            String accessToken = jwtService.generateToken(extraClaims, userDetails);
            String refreshToken = jwtService.generateRefreshToken(userDetails);

            // 5. Construir respuesta
            LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo(
                    user.getIdPerson(),
                    user.getFirstName(),
                    user.getSurname(),
                    user.getEmail(),
                    user.getRole().name());

            LoginResponse response = new LoginResponse(
                    accessToken,
                    refreshToken,
                    jwtService.getAccessTokenExpiration(),
                    userInfo);

            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            // Respuesta genérica para no revelar si el email existe o no
            Map<String, String> error = new HashMap<>();
            error.put("error", "Credenciales inválidas");
            error.put("message", "El correo electrónico o la contraseña son incorrectos");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    /**
     * POST /api/auth/register
     * Registra un nuevo usuario y retorna tokens JWT.
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDto userDto) {
        try {
            // 1. Crear el usuario (UserServices ya valida y hashea el password)
            User user = userServices.createUser(userDto);

            // 2. Cargar como UserDetails para generar token
            CustomUserDetails userDetails = new CustomUserDetails(user);

            // 3. Generar claims
            Map<String, Object> extraClaims = new HashMap<>();
            extraClaims.put("role", user.getRole().name());
            extraClaims.put("userId", user.getIdPerson());
            extraClaims.put("fullName", user.getFirstName() + " " + user.getSurname());

            // 4. Generar tokens
            String accessToken = jwtService.generateToken(extraClaims, userDetails);
            String refreshToken = jwtService.generateRefreshToken(userDetails);

            // 5. Construir respuesta
            LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo(
                    user.getIdPerson(),
                    user.getFirstName(),
                    user.getSurname(),
                    user.getEmail(),
                    user.getRole().name());

            LoginResponse response = new LoginResponse(
                    accessToken,
                    refreshToken,
                    jwtService.getAccessTokenExpiration(),
                    userInfo);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error en el registro");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    /**
     * GET /api/auth/me
     * Retorna los datos del usuario autenticado actualmente.
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()
                || authentication.getPrincipal().equals("anonymousUser")) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "No autenticado");
            error.put("message", "Debe iniciar sesión para acceder a este recurso");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = userDetails.getUser();

        LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo(
                user.getIdPerson(),
                user.getFirstName(),
                user.getSurname(),
                user.getEmail(),
                user.getRole().name());

        return ResponseEntity.ok(userInfo);
    }

    /**
     * POST /api/auth/refresh
     * Genera un nuevo access token usando el refresh token.
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");

        if (refreshToken == null || refreshToken.isBlank()) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Token requerido");
            error.put("message", "El refresh token es obligatorio");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }

        try {
            String userEmail = jwtService.extractUsername(refreshToken);
            User user = userServices.getUserByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            CustomUserDetails userDetails = new CustomUserDetails(user);

            if (!jwtService.isTokenValid(refreshToken, userDetails)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Token inválido");
                error.put("message", "El refresh token ha expirado o es inválido");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            // Generar nuevo access token
            Map<String, Object> extraClaims = new HashMap<>();
            extraClaims.put("role", user.getRole().name());
            extraClaims.put("userId", user.getIdPerson());
            extraClaims.put("fullName", user.getFirstName() + " " + user.getSurname());

            String newAccessToken = jwtService.generateToken(extraClaims, userDetails);

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", newAccessToken);
            response.put("expiresIn", jwtService.getAccessTokenExpiration());
            response.put("tokenType", "Bearer");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Token inválido");
            error.put("message", "No se pudo procesar el refresh token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }
}
