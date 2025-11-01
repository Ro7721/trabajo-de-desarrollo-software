package com.proyecto.sistemaVenta.models.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
@Entity
@Table(name = "producto")
public class Producto {
    @Id
    @Column(name="idProducto", length = 40, unique = true, nullable = false)
    private String idProducto;
    @Column(length = 250, nullable = false)
    private String description;
    @Enumerated(EnumType.STRING)
    private Categoria category;
    private String fileImage;
    @Column(length = 50, nullable = false)
    private String unidad;
    private double stockAviable;
    private double purchesePrice;
    private double salePrice;
    private double unitPrice;
    private LocalDate updatedAt;
    @PrePersist
    public void PrePersist(){
        this.updatedAt = LocalDate.now();
    }
    @PreUpdate
    public void PreUpdate(){
        this.updatedAt = LocalDate.now();
    }

    public String getIdProducto() {
        return idProducto;
    }
    public void setIdProducto(String idProducto) {
        this.idProducto = idProducto;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Categoria getCategory() {
        return category;
    }
    public void setCategory(Categoria category) {
        this.category = category;
    }
    public String getFileImage() {
        return fileImage;
    }
    public void setFileImage(String fileImage) {
        this.fileImage = fileImage;
    }
    public String getUnidad() {
        return unidad;
    }
    public void setUnidad(String unidad) {
        this.unidad = unidad;
    }
    public double getStockAviable() {
        return stockAviable;
    }
    public void setStockAviable(double stockAviable) {
        this.stockAviable = stockAviable;
    }
    
    public double getPurchesePrice() {
        return purchesePrice;
    }
    public void setPurchesePrice(double purchesePrice) {
        this.purchesePrice = purchesePrice;
    }
    public double getSalePrice() {
        return salePrice;
    }
    public void setSalePrice(double salePrice) {
        this.salePrice = salePrice;
    }
    public double getUnitPrice() {
        return unitPrice;
    }
    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }
    public LocalDate getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }
    public enum Categoria{
        ELECTRONICA,
        ROPA, BEBIDAS,
        TECNOLOGIA,
    }
}
