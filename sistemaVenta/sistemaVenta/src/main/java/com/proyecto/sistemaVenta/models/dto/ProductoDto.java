package com.proyecto.sistemaVenta.models.dto;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


public class ProductoDto {

    private String idProducto;
    @NotEmpty(message = "La descripcion es necesaria")
    @Size(min = 5, max = 250)
    private String description;
    private String category;
    private MultipartFile fileImage;
    @NotEmpty(message = "Las Unidades de medida son necesarias")
    private String unidad;
    @NotNull(message = "El stock dispoblie es necesario")
    private double stockAviable;
    @NotNull(message = "El precio de compra es necesario")
    private double purchesePrice;
    @NotNull(message = "El prcio de venta es necesario")
    private double salePrice;
    @NotNull(message = "Precio unitario es necesario")
    private double unitPrice;
    private LocalDate updatedAt;
    
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
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public MultipartFile getFileImage() {
        return fileImage;
    }
    public void setFileImage(MultipartFile fileImage) {
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
    //metodos 

}
