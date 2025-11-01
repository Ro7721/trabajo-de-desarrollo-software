package com.Practica.demo.services;

import com.Practica.demo.models.*;
import com.Practica.demo.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class CompraService {
    
    @Autowired
    private CompraProveedorRepository compraRepository;
    
    @Autowired
    private ProductoRepository productoRepository;
    
    @Transactional
    public CompraProveedor procesarCompra(CompraProveedor compra) {
        // Validar que la factura no exista
        if (compraRepository.findByNumeroFactura(compra.getNumeroFactura()).isPresent()) {
            throw new RuntimeException("El número de factura ya existe");
        }
        
        // Calcular totales
        compra.calcularTotales();
        
        // Guardar la compra
        CompraProveedor compraGuardada = compraRepository.save(compra);
        
        // Actualizar stock y precios de productos
        for (DetalleCompra detalle : compra.getDetalles()) {
            Producto producto = detalle.getProducto();
            
            // Actualizar stock
            int unidadesCompradas = detalle.getCantidad();
            if (detalle.getContenidoUnidad() != null && detalle.getContenidoUnidad() > 1) {
                unidadesCompradas *= detalle.getContenidoUnidad();
            }
            int nuevoStock = producto.getStock() + unidadesCompradas;
            producto.setStock(nuevoStock);

            // Actualizar precio si es menor al actual o si no tiene precio
            if (producto.getPrecio() == null || 
                detalle.getPrecioUnitario().compareTo(
                    producto.getPrecio() != null ? BigDecimal.valueOf(producto.getPrecio()) : BigDecimal.ZERO
                ) < 0) {
                producto.setPrecio(detalle.getPrecioUnitario().doubleValue());
            }
            
            productoRepository.save(producto);
        }
        
        // Cambiar estado a COMPLETADA
        compraGuardada.setEstado("COMPLETADA");
        CompraProveedor compraFinal = compraRepository.save(compraGuardada);
        
        System.out.println("✅ Compra procesada exitosamente - Factura: " + compraFinal.getNumeroFactura());
        System.out.println("✅ Total productos actualizados: " + compra.getDetalles().size());
        
        return compraFinal;
    }
    //metodos para obtener compras y cancelar compras
    public List<CompraProveedor> obtenerTodasLasCompras() {
        return compraRepository.findAll();
    }
    
    public Optional<CompraProveedor> obtenerCompraPorId(Long id) {
        return compraRepository.findById(id);
    }
    
    @Transactional
    public void cancelarCompra(Long compraId) {
        Optional<CompraProveedor> compraOpt = compraRepository.findById(compraId);
        if (compraOpt.isPresent()) {
            CompraProveedor compra = compraOpt.get();
            
            // Revertir stock
            for (DetalleCompra detalle : compra.getDetalles()) {
                Producto producto = detalle.getProducto();
                
                int unidadesCompradas = detalle.getCantidad();
                if (detalle.getContenidoUnidad() != null && detalle.getContenidoUnidad() > 1) {
                    unidadesCompradas *= detalle.getContenidoUnidad();
                }
                
                producto.setStock(Math.max(0, producto.getStock() - unidadesCompradas));
                productoRepository.save(producto);
            }
            
            // Cambiar estado a CANCELADA
            compra.setEstado("CANCELADA");
            compraRepository.save(compra);
        }
    }
}