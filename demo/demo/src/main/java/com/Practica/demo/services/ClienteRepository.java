package com.Practica.demo.services;

import com.Practica.demo.models.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
    // Buscar por email
    Optional<Cliente> findByEmail(String email);
    
    // Buscar por DNI
    Optional<Cliente> findByDni(String dni);
    
    // Buscar por nombre o apellido
    List<Cliente> findByNombreContainingIgnoreCaseOrApellidoContainingIgnoreCase(String nombre, String apellido);
    
    // Contar total de clientes
    long count();
    
    // Buscar clientes registrados en un período
    @Query("SELECT c FROM Cliente c WHERE c.fechaRegistro BETWEEN :startDate AND :endDate")
    List<Cliente> findClientesRegistradosEntre(@Param("startDate") LocalDateTime startDate, 
                                              @Param("endDate") LocalDateTime endDate);
}