package com.epiis.mi_app.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.epiis.mi_app.dto.CategoryDto;
import com.epiis.mi_app.dto.ProductDto;
import com.epiis.mi_app.model.Category;
import com.epiis.mi_app.model.Product;
import com.epiis.mi_app.repository.CategoryRepository;
import com.epiis.mi_app.repository.ProductRepository;

@Service
public class ProductServices {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    public Product createProduct(ProductDto productDto) {
        Product product = new Product();
        product.setIdProduct(UUID.randomUUID().toString());
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setStock(productDto.getStock());
        product.setSku(productDto.getSku());
        product.setImageUrl(productDto.getImageUrl());
        if (productDto.getCategoryId() != null) {
            Category category = categoryRepository.findById(productDto.getCategoryId()).orElse(null);
            product.setCategory(category);
        }
        product.setFeatured(productDto.isFeatured());
        product.setRating(productDto.getRating());
        product.setReviewCount(productDto.getReviewCount());
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());
        product.setDiscountPrice(productDto.getDiscountPrice());
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    public Product mapDtoProductUpdate(ProductDto productDto, Product exisProduct) {
        exisProduct.setName(productDto.getName());
        exisProduct.setDescription(productDto.getDescription());
        exisProduct.setPrice(productDto.getPrice());
        exisProduct.setStock(productDto.getStock());
        exisProduct.setSku(productDto.getSku());
        exisProduct.setImageUrl(productDto.getImageUrl());
        exisProduct.setCategory(categoryRepository.findById(productDto.getCategoryId()).get());
        exisProduct.setFeatured(productDto.isFeatured());
        exisProduct.setRating(productDto.getRating());
        exisProduct.setReviewCount(productDto.getReviewCount());
        exisProduct.setUpdatedAt(LocalDateTime.now());
        exisProduct.setDiscountPrice(productDto.getDiscountPrice());
        return exisProduct;
    }

    // actualizar Productos
    public Product upddateProduct(ProductDto dto, String idProduct) {
        Product exisProduct = productRepository.findById(idProduct)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        try {
            Product update = mapDtoProductUpdate(dto, exisProduct);
            return productRepository.save(update);
        } catch (Exception e) {
            throw new RuntimeException("Error updating product");
        }

    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    // filtrar por categoria los productos
    public List<Product> getProductsByCategory(Category category) {
        return productRepository.findAllByCategory(category);
    }

    // filtrar por nombre los productos
    public List<Product> getProductsByName(String name) {
        return productRepository.findByNameContaining(name);
    }

    // cantidad de productos
    public Long countProducts() {
        return productRepository.count();
    }

    // ordenar los productos
    public List<Product> getProductsOrderByPriceDesc() {
        return productRepository.findAllByOrderByPriceDesc();
    }

    // paginacion
    public Page<Product> getProductsByPage(String name, Pageable pageable) {
        return productRepository.findByNameContainingIgnoreCase(name, pageable);
    }

    public Page<Product> getProducts(int page, int size, String category, String sortBy, String search) {
        Pageable pageable = PageRequest.of(page, size);
        Specification<Product> spec = Specification.where((root, query, cb) -> cb.conjunction());

        if (search != null && !search.isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.or(
                    cb.like(cb.lower(root.get("name")), "%" + search.toLowerCase() + "%"),
                    cb.like(cb.lower(root.get("description")), "%" + search.toLowerCase() + "%")));
        }

        if (category != null && !category.isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("category").get("name"), category));
        }

        if ("price_asc".equals(sortBy)) {
            pageable = PageRequest.of(page, size, Sort.by("price").ascending());
        } else if ("price_desc".equals(sortBy)) {
            pageable = PageRequest.of(page, size, Sort.by("price").descending());
        } else if ("newest".equals(sortBy)) {
            pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        }
        return productRepository.findAll(spec, pageable);
    }

    public List<Product> getFeaturedProduct() {
        return productRepository.findByIsFeaturedTrue();
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category creaCategory(CategoryDto dto) {
        Category category = new Category();
        category.setId(dto.getId());
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        category.setImageUrl(dto.getImageUrl());
        category.setProducts(getAllProducts());
        return categoryRepository.save(category);
    }

    // obtener detalles completo de producto
    public ProductDto getProductoDetailsById(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("product not fount"));
        return convertToDetailsDto(product);
    }

    private ProductDto convertToDetailsDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setIdProduct(product.getIdProduct());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setDiscountPrice(product.getDiscountPrice());

        /*
         * //calcular porcentaje de descuento
         * if(product.getPrice() != null && product.getDiscountPrice() != null){
         * BigDecimal
         * }
         */
        dto.setStock(product.getStock());
        dto.setSku(product.getSku());
        dto.setCategory(product.getCategory());
        // Imagenes
        List<String> imgs = new ArrayList<>();
        if (product.getImageUrl() != null) {
            imgs = Arrays.asList(product.getImageUrl().split(","));
        }
        dto.setImageUrl(imgs.get(0));
        dto.setRating(product.getRating());
        dto.setReviewCount(product.getReviewCount());
        dto.setFeatured(product.isFeatured());
        dto.setCreatedAt(product.getCreatedAt());
        dto.setUpdatedAt(product.getUpdatedAt());
        return dto;
    }
}
