package com.Practica.demo.services;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import com.Practica.demo.models.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Integer>{
    // Coincidencia parcial (contiene la cadena)
    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    // O usando Like (más flexible con comodines)
    @Query("SELECT p FROM Producto p WHERE LOWER(p.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<Producto> buscarPorNombre(@Param("nombre") String nombre);
    // filatrar producto por categoria 
    List<Producto> findByCategoria(String categoria);
    //Utilizar un proceso alamcenado de base de base de datos
    @Procedure(procedureName = "filtrar_x_Categoria")
    List<Producto> filtrarPorCategoria(@Param("p_categoria") String categoria);
}
