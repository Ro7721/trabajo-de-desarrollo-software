package com.proyecto.sistemaVenta.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.proyecto.sistemaVenta.models.entity.Usuario;
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Método para buscar usuario por nombre de usuario
    Optional<Usuario> findByNombreUsuario(String nombreUsuario);
    
    // Métodos para validar si ya existe un usuario o documento
    boolean existsByNombreUsuario(String nombreUsuario);
    boolean existsByNroDocumento(String nroDocumento);
    
    // Método para buscar por rol (corregido - el método anterior tenía error)
    List<Usuario> findByRol(Usuario.Rol rol);
    
    // Método para buscar usuarios activos
    List<Usuario> findByEstado(String estado);
    
    // Método para buscar por nombre o apellido
    @Query("SELECT u FROM Usuario u WHERE LOWER(u.nombre) LIKE LOWER(CONCAT('%', :termino, '%')) OR " +
           "LOWER(u.apellido) LIKE LOWER(CONCAT('%', :termino, '%'))")
    List<Usuario> buscarPorNombreOApellido(@Param("termino") String termino);
    
    // Método para contar usuarios activos
    long countByEstado(String estado);

}
