package epiis.miproyecto.reactspring.service;

import java.time.LocalDateTime;
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

import epiis.miproyecto.reactspring.dto.CategoryDto;
import epiis.miproyecto.reactspring.dto.ProductDto;
import epiis.miproyecto.reactspring.model.Category;
import epiis.miproyecto.reactspring.model.Product;
import epiis.miproyecto.reactspring.repository.CategoryRepository;
import epiis.miproyecto.reactspring.repository.ProductRepository;

@Service
public class ProductService {
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

    public void updateProduct(ProductDto productDto) {
        Product product = productRepository.findById(productDto.getIdProduct()).get();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setStock(productDto.getStock());
        product.setSku(productDto.getSku());
        product.setImageUrl(productDto.getImageUrl());
        product.setCategory(categoryRepository.findById(productDto.getCategoryId()).get());
        product.setFeatured(productDto.isFeatured());
        product.setRating(productDto.getRating());
        product.setReviewCount(productDto.getReviewCount());
        product.setUpdatedAt(LocalDateTime.now());
        product.setDiscountPrice(productDto.getDiscountPrice());
        productRepository.save(product);
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
                    cb.like(cb.lower(root.get("name")), "%" +  search.toLowerCase() + "%"),
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
}
