package com.epiis.mi_app.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "products")
public class Product {
    @Id
    @Column(name = "idProduct", nullable = false, length = 40)
    private String idProduct;
    @Column(nullable = false)
    private String name;
    @Column(length = 300)
    private String description;
    @Column(nullable = false)
    private BigDecimal price;

    private BigDecimal discountPrice;// precio de descuento
    @Column(nullable = false)
    private Integer stock;
    private String sku;
    @Column(name = "imageUrl", nullable = false)
    private String imageUrl;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
    @Column(name = "isFeatured", nullable = false)
    private boolean isFeatured = false;
    private double rating;
    @Column(name = "reviewCount", nullable = false)
    private Integer reviewCount = 0;
    @Column(name = "createdAt")
    private LocalDateTime createdAt;
    @Column(name = "updatedAt")
    private LocalDateTime updatedAt;
    // private string brand;//marca
    // private String imageGallery; // lista de Urls dela fotos adicionales

}
