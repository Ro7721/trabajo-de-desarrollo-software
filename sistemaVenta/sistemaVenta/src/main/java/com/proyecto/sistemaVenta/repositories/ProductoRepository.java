package com.proyecto.sistemaVenta.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.proyecto.sistemaVenta.models.entity.Producto;
import java.util.List;
import java.util.Locale.Category;


@Repository
public interface ProductoRepository extends JpaRepository<Producto, String> {

    //aqui van los metodos necesarios
    List<Producto> findByDescription(String description);
    List<Producto> findByCategory(Category category);

    // Búsqueda dinámica (LIKE) por descripción parcial
    @Query("SELECT p FROM Producto p WHERE LOWER(p.description) LIKE LOWER(CONCAT('%', :description, '%'))")
    List<Producto> searchByDescription(@Param("description") String description);

    // Filtrar por categoría
    @Query("SELECT p FROM Producto p WHERE p.category = :category")
    List<Producto> filterByCategory(@Param("category") Producto.Categoria category);

    // Buscar por rango de precios (opcional)
    @Query("SELECT p FROM Producto p WHERE p.salePrice BETWEEN :minPrice AND :maxPrice")
    List<Producto> findByPriceRange(@Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice);

    // Buscar productos con stock bajo
    @Query("SELECT p FROM Producto p WHERE p.stockAviable < :stockLimit")
    List<Producto> findLowStock(@Param("stockLimit") double stockLimit);
    // metodo para validar stock
    
}
