package com.Practica.demo.models;

import java.math.BigDecimal;
import java.math.RoundingMode;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "detalle_compra")
public class DetalleCompra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "compra_id", nullable = false)
    private CompraProveedor compra;
    
    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;
    
    @Column(nullable = false)
    private Integer cantidad;
    
    @Column(name = "precio_unitario", precision = 10, scale = 2, nullable = false)
    private BigDecimal precioUnitario;
    
    @Column(name = "unidad_medida", length = 20)
    private String unidadMedida; // UNIDAD, CAJA, PAQUETE, KILO, etc.
    
    @Column(name = "contenido_unidad")
    private Integer contenidoUnidad; // Ej: 12 unidades por caja
    
    @Column(name = "precio_por_unidad", precision = 10, scale = 2)
    private BigDecimal precioPorUnidad;
    
    @Column(name = "precio_venta_sugerido", precision = 10, scale = 2)
    private BigDecimal precioVentaSugerido;
    
    @Column(name = "subtotal", precision = 10, scale = 2)
    private BigDecimal subtotal;
    
    // Constructores
    public DetalleCompra() {}
    
    public DetalleCompra(Producto producto, Integer cantidad, BigDecimal precioUnitario, String unidadMedida) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.unidadMedida = unidadMedida;
        calcularSubtotal();
    }
    
    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public CompraProveedor getCompra() { return compra; }
    public void setCompra(CompraProveedor compra) { this.compra = compra; }
    
    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }
    
    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { 
        this.cantidad = cantidad;
        calcularSubtotal();
    }
    
    public BigDecimal getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(BigDecimal precioUnitario) { 
        this.precioUnitario = precioUnitario;
        calcularSubtotal();
    }
    
    public String getUnidadMedida() { return unidadMedida; }
    public void setUnidadMedida(String unidadMedida) { this.unidadMedida = unidadMedida; }
    
    public Integer getContenidoUnidad() { return contenidoUnidad; }
    public void setContenidoUnidad(Integer contenidoUnidad) { 
        this.contenidoUnidad = contenidoUnidad;
        calcularPrecioPorUnidad();
    }
    
    public BigDecimal getPrecioPorUnidad() { return precioPorUnidad; }
    public void setPrecioPorUnidad(BigDecimal precioPorUnidad) { this.precioPorUnidad = precioPorUnidad; }
    
    public BigDecimal getPrecioVentaSugerido() { return precioVentaSugerido; }
    public void setPrecioVentaSugerido(BigDecimal precioVentaSugerido) { this.precioVentaSugerido = precioVentaSugerido; }
    
    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
    
    // Métodos de cálculo
    public void calcularSubtotal() {
        if (cantidad != null && precioUnitario != null) {
            this.subtotal = precioUnitario.multiply(new BigDecimal(cantidad));
        }
    }
    
    public void calcularPrecioPorUnidad() {
        if (contenidoUnidad != null && contenidoUnidad > 0 && precioUnitario != null) {
            this.precioPorUnidad = precioUnitario.divide(new BigDecimal(contenidoUnidad), 2, RoundingMode.HALF_UP);
        }
    }
}
