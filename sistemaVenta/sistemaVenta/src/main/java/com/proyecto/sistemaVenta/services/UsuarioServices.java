package com.proyecto.sistemaVenta.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.proyecto.sistemaVenta.models.dto.UsuarioDto;
import com.proyecto.sistemaVenta.models.entity.Usuario;
import com.proyecto.sistemaVenta.repositories.UsuarioRepository;
import com.proyecto.sistemaVenta.security.PasswordHasher;

@Service
@Transactional
public class UsuarioServices {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordHasher passwordHasher;
    
    // Método para mapear Usuario a UsuarioDto
    public UsuarioDto mapToDto(Usuario usuario) {
        UsuarioDto usuarioDto = new UsuarioDto();
        usuarioDto.setId(usuario.getIDPERSONA()); // Usar IDPERSONA de la clase padre
        usuarioDto.setNombre(usuario.getNombre());
        usuarioDto.setApellido(usuario.getApellido());
        usuarioDto.setSexo(usuario.getSexo());
        usuarioDto.setFechaNacimiento(usuario.getFechaNacimiento());
        usuarioDto.setNroDocumento(usuario.getNroDocumento());
        usuarioDto.setNombreUsuario(usuario.getNombreUsuario());
        usuarioDto.setRol(usuario.getRol() != null ? usuario.getRol().name() : null);
        usuarioDto.setActivo("ACTIVO".equalsIgnoreCase(usuario.getEstado()));
        usuarioDto.setEstado(usuario.getEstado());
        // No establecer password por seguridad
        return usuarioDto;
    }
    
    // Método para mapear UsuarioDto a Usuario (para creación)
    private Usuario mapToEntity(UsuarioDto usuarioDto) {
        Usuario usuario = new Usuario();
        return updateEntityFromDto(usuario, usuarioDto);
    }
    
    // Método para actualizar entidad desde DTO
    private Usuario updateEntityFromDto(Usuario usuario, UsuarioDto usuarioDto) {
        usuario.setNombre(usuarioDto.getNombre());
        usuario.setApellido(usuarioDto.getApellido());
        usuario.setSexo(usuarioDto.getSexo());
        usuario.setFechaNacimiento(usuarioDto.getFechaNacimiento());
        usuario.setNroDocumento(usuarioDto.getNroDocumento());
        usuario.setNombreUsuario(usuarioDto.getNombreUsuario());
        if (usuario.getIDPERSONA() == null) {
            usuario.setEstado("ACTIVO");
        } else {
            usuario.setEstado(usuarioDto.getEstado() != null ? usuarioDto.getEstado() : "ACTIVO");
        }
        // Convertir y establecer rol
        if (usuarioDto.getRol() != null && !usuarioDto.getRol().trim().isEmpty()) {
            try {
                Usuario.Rol rolEnum = Usuario.Rol.valueOf(usuarioDto.getRol().toUpperCase());
                usuario.setRol(rolEnum);
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Rol inválido: " + usuarioDto.getRol() + 
                    ". Roles válidos: " + java.util.Arrays.toString(Usuario.Rol.values()));
            }
        }
        
        // Hashear password si se proporciona
        if (usuarioDto.getPassword() != null && !usuarioDto.getPassword().trim().isEmpty()) {
            String hashedPassword = passwordHasher.hashPassword(usuarioDto.getPassword());
            usuario.setPassword(hashedPassword);
        }
        
        return usuario;
    }
    
    // Validaciones comunes
    private void validateUsuarioDto(UsuarioDto usuarioDto, Long excludeUserId) {
        // Validar nombre de usuario único
        if (usuarioRepository.existsByNombreUsuario(usuarioDto.getNombreUsuario())) {
            Optional<Usuario> existingUser = usuarioRepository.findByNombreUsuario(usuarioDto.getNombreUsuario());
            if (excludeUserId == null || 
                (existingUser.isPresent() && !existingUser.get().getIDPERSONA().equals(excludeUserId))) {
                throw new IllegalArgumentException("El nombre de usuario ya existe");
            }
        }
        
        // Validar número de documento único
        if (usuarioRepository.existsByNroDocumento(usuarioDto.getNroDocumento())) {
            // Buscar usuario con este documento para verificar si es el mismo
            List<Usuario> usuariosConMismoDocumento = usuarioRepository.findAll()
                .stream()
                .filter(u -> u.getNroDocumento().equals(usuarioDto.getNroDocumento()))
                .collect(Collectors.toList());
            
            if (!usuariosConMismoDocumento.isEmpty() && 
                (excludeUserId == null || 
                 !usuariosConMismoDocumento.get(0).getIDPERSONA().equals(excludeUserId))) {
                throw new IllegalArgumentException("El número de documento ya existe");
            }
        }
        
        // Validar rol
        if (usuarioDto.getRol() == null || usuarioDto.getRol().trim().isEmpty()) {
            throw new IllegalArgumentException("El rol no puede estar vacío");
        }
        
        try {
            Usuario.Rol.valueOf(usuarioDto.getRol().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Rol inválido: " + usuarioDto.getRol() + 
                ". Roles válidos: " + java.util.Arrays.toString(Usuario.Rol.values()));
        }
        
        // Validar fecha de nacimiento (mayor de 18 años)
        if (usuarioDto.getFechaNacimiento() != null) {
            java.time.LocalDate fechaMinima = java.time.LocalDate.now().minusYears(18);
            if (usuarioDto.getFechaNacimiento().isAfter(fechaMinima)) {
                throw new IllegalArgumentException("El usuario debe ser mayor de 18 años");
            }
        }
    }
    
    // Método para crear usuario
    @Transactional
    public void crearUsuario(UsuarioDto usuarioDto) {
        // Validaciones
        validateUsuarioDto(usuarioDto, null);
        
        // Validar contraseña
        if (usuarioDto.getPassword() == null || usuarioDto.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("La contraseña no puede estar vacía");
        }
        
        // Mapear y guardar
        Usuario usuario = mapToEntity(usuarioDto);
        usuarioRepository.save(usuario);
    }
    
    // Método para listar usuarios
    @Transactional(readOnly = true)
    public List<UsuarioDto> listarUsuarios() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    
    // Método para obtener usuario por ID
    @Transactional(readOnly = true)
    public UsuarioDto obtenerUsuarioPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con ID: " + id));
        return mapToDto(usuario);
    }
    
    // Método para actualizar usuario
    @Transactional
    public void actualizarUsuario(Long id, UsuarioDto usuarioDto) {
        Usuario usuarioExistente = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con ID: " + id));
        
        // Validaciones (excluyendo el usuario actual)
        validateUsuarioDto(usuarioDto, id);
        
        // Actualizar entidad
        updateEntityFromDto(usuarioExistente, usuarioDto);
        usuarioRepository.save(usuarioExistente);
    }
    
    // Método para eliminar usuario (soft delete)
    @Transactional
    public void eliminarUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con ID: " + id));
        
        // Soft delete - cambiar estado a INACTIVO
        usuario.setEstado("INACTIVO");
        usuarioRepository.save(usuario);
    }
    
    // Método para actualizar contraseña
    @Transactional
    public boolean updatePassword(Long userId, String currentPassword, String newPassword) {
        Optional<Usuario> userOptional = usuarioRepository.findById(userId);
        
        if (userOptional.isPresent()) {
            Usuario usuario = userOptional.get();
            
            // Verificar contraseña actual
            if (passwordHasher.verifyPassword(currentPassword, usuario.getPassword())) {
                // Hashear nueva contraseña
                String hashedPassword = passwordHasher.hashPassword(newPassword);
                usuario.setPassword(hashedPassword);
                usuarioRepository.save(usuario);
                return true;
            }
        }
        return false;
    }
    
    // Método para buscar por nombre de usuario
    @Transactional(readOnly = true)
    public UsuarioDto buscarPorNombreUsuario(String nombreUsuario) {
        Usuario usuario = usuarioRepository.findByNombreUsuario(nombreUsuario)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado: " + nombreUsuario));
        return mapToDto(usuario);
    }
    
    // Método para cambiar estado de usuario
    @Transactional
    public void cambiarEstadoUsuario(Long id, String estado) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con ID: " + id));
        
        if (!estado.equals("ACTIVO") && !estado.equals("INACTIVO")) {
            throw new IllegalArgumentException("Estado inválido. Use 'ACTIVO' o 'INACTIVO'");
        }
        
        usuario.setEstado(estado);
        usuarioRepository.save(usuario);
    }
    
    // Método para obtener todos los roles disponibles
    public Usuario.Rol[] getRolesDisponibles() {
        return Usuario.Rol.values();
    }
}