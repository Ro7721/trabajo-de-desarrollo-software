package com.Practica.demo.repositories;

import com.Practica.demo.models.CompraProveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CompraProveedorRepository extends JpaRepository<CompraProveedor, Long> {
    Optional<CompraProveedor> findByNumeroFactura(String numeroFactura);
    List<CompraProveedor> findByEstado(String estado);
    
}