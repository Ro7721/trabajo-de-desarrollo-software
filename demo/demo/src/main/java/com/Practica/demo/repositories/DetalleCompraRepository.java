package com.Practica.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Practica.demo.models.DetalleCompra;
@Repository
public interface DetalleCompraRepository extends JpaRepository<DetalleCompra, Long> {
    
}
