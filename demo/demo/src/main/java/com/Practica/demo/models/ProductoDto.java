package com.Practica.demo.models;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class ProductoDto {
    
    @NotEmpty(message = "El nombre no puede estar vacío")
    private String nombre;
    
    @NotEmpty(message = "La marca no puede estar vacía")
    private String marca;
    
    @NotEmpty(message = "La categoría no puede estar vacía")
    private String categoria;
    
    @Min(value = 0, message = "El precio debe ser mayor o igual a 0")
    private Double precio;
    
    @Size(min = 10, message = "La descripción debe tener al menos 10 caracteres")
    @Size(max = 200, message = "La descripción debe tener como máximo 200 caracteres")
    private String descripcion;
    
    private MultipartFile imagen; // ✅ Solo en el DTO, NO en la entidad
    
    @Min(value = 0, message = "El stock debe ser mayor o igual a 0")
    private Integer stock;

    // ✅ SETTERS (obligatorios)
    public void setNombre(String nombre) { this.nombre = nombre; }
    public void setMarca(String marca) { this.marca = marca; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
    public void setPrecio(Double precio) { this.precio = precio; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public void setImagen(MultipartFile imagen) { this.imagen = imagen; }
    public void setStock(Integer stock) { this.stock = stock; }

    // ✅ GETTERS
    public String getNombre() { return nombre; }
    public String getMarca() { return marca; }
    public String getCategoria() { return categoria; }
    public Double getPrecio() { return precio; }
    public String getDescripcion() { return descripcion; }
    public MultipartFile getImagen() { return imagen; }
    public Integer getStock() { return stock; }
}