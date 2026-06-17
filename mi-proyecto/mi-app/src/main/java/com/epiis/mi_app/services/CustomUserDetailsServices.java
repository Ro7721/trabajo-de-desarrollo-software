package com.epiis.mi_app.services;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.epiis.mi_app.model.User;
import com.epiis.mi_app.repository.UserRepository;
import com.epiis.mi_app.security.CustomUserDetails;

/**
 * Servicio que carga los datos del usuario para Spring Security.
 * Es el puente entre nuestra BD y el sistema de autenticación.
 */
@Service
public class CustomUserDetailsServices implements UserDetailsService {

    private final UserRepository userRepo;

    public CustomUserDetailsServices(UserRepository userRepository) {
        this.userRepo = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Buscar por email (que es el identificador de login)
        Optional<User> user = userRepo.findByEmailAndActiveTrue(email);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("Usuario no encontrado con email: " + email);
        }
        return new CustomUserDetails(user.get());
    }
}
