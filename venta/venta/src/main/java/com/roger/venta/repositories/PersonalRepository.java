package com.roger.venta.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.roger.venta.models.entity.Personal;

@Repository
public interface PersonalRepository  extends JpaRepository<Personal, Long>{
    // Método para buscar usuario por nombre de usuario
    Optional<Personal> findByNombreUsuario(String nombreUsuario);
    
    // Métodos para validar si ya existe un usuario o documento
    boolean existsByNombreUsuario(String nombreUsuario);
    boolean existsByNroDocumento(String nroDocumento);
    
    // Método para buscar por rol (corregido - el método anterior tenía error)
    List<Personal> findByRol(Personal.Rol rol);
    
    // Método para buscar usuarios activos
    List<Personal> findByEstado(String estado);
    
    // Método para buscar por nombre o apellido
    @Query("SELECT u FROM Personal u WHERE LOWER(u.nombre) LIKE LOWER(CONCAT('%', :termino, '%')) OR " +
           "LOWER(u.apellido) LIKE LOWER(CONCAT('%', :termino, '%'))")
    List<Personal> buscarPorNombreOApellido(@Param("termino") String termino);
    
    // Método para contar usuarios activos
    long countByEstado(String estado);
}
