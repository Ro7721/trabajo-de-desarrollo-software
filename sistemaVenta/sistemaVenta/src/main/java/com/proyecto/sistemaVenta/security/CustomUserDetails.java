package com.proyecto.sistemaVenta.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.proyecto.sistemaVenta.models.entity.Usuario;

public class CustomUserDetails implements UserDetails {
    private final Usuario usuario;
    public CustomUserDetails(Usuario usuario){
        this.usuario = usuario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_"+ usuario.getRol().name()));
    }
    @Override
    public String getPassword(){
        return usuario.getPassword();
    }
    @Override
    public String getUsername(){
        return usuario.getNombreUsuario();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
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
        return usuario.getEstado().equalsIgnoreCase("ACTIVO");
    }
    public Usuario getUsuario(){
        return usuario;
    }
}
