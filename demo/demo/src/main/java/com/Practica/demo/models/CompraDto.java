package com.Practica.demo.models;

import java.math.BigDecimal;

public class CompraDto {
    private Long proveedorId;
    private Long productoId;
    private Integer cantidad;
    private BigDecimal precioUnitario;
    private String unidadMedida;
    private Integer contenidoUnidad;
    private BigDecimal precioVentaSugerido;
    private String numeroFactura;
    private String observaciones;
    
    // Getters y Setters
    public Long getProveedorId() { return proveedorId; }
    public void setProveedorId(Long proveedorId) { this.proveedorId = proveedorId; }
    
    public Long getProductoId() { return productoId; }
    public void setProductoId(Long productoId) { this.productoId = productoId; }
    
    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
    
    public BigDecimal getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(BigDecimal precioUnitario) { this.precioUnitario = precioUnitario; }
    
    public String getUnidadMedida() { return unidadMedida; }
    public void setUnidadMedida(String unidadMedida) { this.unidadMedida = unidadMedida; }
    
    public Integer getContenidoUnidad() { return contenidoUnidad; }
    public void setContenidoUnidad(Integer contenidoUnidad) { this.contenidoUnidad = contenidoUnidad; }
    
    public BigDecimal getPrecioVentaSugerido() { return precioVentaSugerido; }
    public void setPrecioVentaSugerido(BigDecimal precioVentaSugerido) { this.precioVentaSugerido = precioVentaSugerido; }
    
    public String getNumeroFactura() { return numeroFactura; }
    public void setNumeroFactura(String numeroFactura) { this.numeroFactura = numeroFactura; }
    
    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
}
