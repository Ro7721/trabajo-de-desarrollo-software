package com.epiis.mi_app.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.epiis.mi_app.model.User;

/**
 * Implementación de UserDetails que envuelve nuestra entidad User.
 * Spring Security usa esto para la autenticación y autorización.
 */
public class CustomUserDetails implements UserDetails {
    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Mapear el rol del usuario a un GrantedAuthority de Spring Security
        return Collections.singleton(new SimpleGrantedAuthority(user.getRole().name()));
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        // Usar email como identificador único (no firstName)
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        // Retornar directamente el estado activo del usuario
        return user.isActive();
    }

    public User getUser() {
        return user;
    }
}
