package com.epiis.mi_app.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.epiis.mi_app.model.Category;
import com.epiis.mi_app.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, String>, JpaSpecificationExecutor<Product> {
    // filtrar por nombre los productos
    List<Product> findByNameContaining(String name);

    // filtrar por categoria los productos
    List<Product> findAllByCategory(Category category);

    // ordenar los productos
    List<Product> findAllByOrderByPriceDesc();

    // paginacion
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);

    List<Product> findByIsFeaturedTrue();
}
