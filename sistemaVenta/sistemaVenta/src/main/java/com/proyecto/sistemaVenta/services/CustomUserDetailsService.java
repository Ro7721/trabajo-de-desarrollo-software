package com.proyecto.sistemaVenta.services;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.proyecto.sistemaVenta.models.entity.Usuario;
import com.proyecto.sistemaVenta.repositories.UsuarioRepository;
import com.proyecto.sistemaVenta.security.CustomUserDetails;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UsuarioRepository usuarioRepository;

    public CustomUserDetailsService(UsuarioRepository usuarioRepository){
        this.usuarioRepository = usuarioRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Optional<Usuario>  usuario = usuarioRepository.findByNombreUsuario(username);
        if(usuario.isEmpty()){
            throw new UsernameNotFoundException("Usuario no encontrado: "+username);
        }
        return new CustomUserDetails(usuario.get());
    }
}
