package com.Practica.demo.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.Practica.demo.models.CompraDto;
import com.Practica.demo.models.CompraProveedor;
import com.Practica.demo.models.DetalleCompra;
import com.Practica.demo.models.Producto;
import com.Practica.demo.models.Proveedor;
import com.Practica.demo.repositories.ProveedorRepository;
import com.Practica.demo.services.CompraService;
import com.Practica.demo.services.ProductoRepository;

@Controller
@RequestMapping("/compras")
public class CompraProveedorController {
    @Autowired
    private CompraService compraService;
    
    @Autowired
    private ProveedorRepository proveedorRepository;
    
    @Autowired
    private ProductoRepository productoRepository;
    
    // Lista temporal en sesión (en producción usarías Redis o base de datos)
    private List<DetalleCompra> carritoCompras = new ArrayList<>();
    private CompraProveedor compraTemporal = new CompraProveedor();
    
    @GetMapping({"", "/"})
    public String listarCompras(Model model) {
        model.addAttribute("compras", compraService.obtenerTodasLasCompras());
        return "compras/index";
    }
    
    @GetMapping("/nueva")
    public String mostrarFormularioCompra(Model model) {
        // Reiniciar carrito
        carritoCompras.clear();
        compraTemporal = new CompraProveedor();
        
        model.addAttribute("compraDto", new CompraDto());
        model.addAttribute("proveedores", proveedorRepository.findAll());
        model.addAttribute("productos", productoRepository.findAll());
        model.addAttribute("carrito", carritoCompras);
        model.addAttribute("compraTemporal", compraTemporal);
        model.addAttribute("unidadesMedida", List.of("UNIDAD", "CAJA", "PAQUETE", "KILO", "LITRO"));
        
        return "compras/nuevaCompra";
    }
    
    @PostMapping("/agregar-item")
    public String agregarItemAlCarrito(@ModelAttribute CompraDto compraDto, Model model) {
        try {
            Optional<Producto> productoOpt = productoRepository.findById(compraDto.getProductoId().intValue());
            
            Optional<Proveedor> proveedorOpt = proveedorRepository.findById(compraDto.getProveedorId());
            
            if (productoOpt.isPresent() && proveedorOpt.isPresent()) {
                Producto producto = productoOpt.get();
                Proveedor proveedor = proveedorOpt.get();
                
                // Configurar proveedor en la compra temporal
                compraTemporal.setProveedor(proveedor);
                compraTemporal.setNumeroFactura(compraDto.getNumeroFactura());
                compraTemporal.setObservaciones(compraDto.getObservaciones());
                
                // Crear detalle
                DetalleCompra detalle = new DetalleCompra();
                detalle.setProducto(producto);
                detalle.setCantidad(compraDto.getCantidad());
                detalle.setPrecioUnitario(compraDto.getPrecioUnitario());
                detalle.setUnidadMedida(compraDto.getUnidadMedida());
                detalle.setContenidoUnidad(compraDto.getContenidoUnidad());
                detalle.setPrecioVentaSugerido(compraDto.getPrecioVentaSugerido());
                detalle.calcularSubtotal();
                detalle.calcularPrecioPorUnidad();
                
                carritoCompras.add(detalle);
                compraTemporal.setDetalles(carritoCompras);
                compraTemporal.calcularTotales();
                
                model.addAttribute("success", "Producto agregado al carrito");
            } else {
                model.addAttribute("error", "Producto o proveedor no encontrado");
            }
        } catch (Exception e) {
            model.addAttribute("error", "Error al agregar producto: " + e.getMessage());
        }
        
        model.addAttribute("compraDto", new CompraDto());
        model.addAttribute("proveedores", proveedorRepository.findAll());
        model.addAttribute("productos", productoRepository.findAll());
        model.addAttribute("carrito", carritoCompras);
        model.addAttribute("compraTemporal", compraTemporal);
        model.addAttribute("unidadesMedida", List.of("UNIDAD", "CAJA", "PAQUETE", "KILO", "LITRO"));
        
        return "compras/nuevaCompra";
    }
    
    @GetMapping("/remover-item/{index}")
    public String removerItemDelCarrito(@PathVariable int index, Model model) {
        if (index >= 0 && index < carritoCompras.size()) {
            carritoCompras.remove(index);
            compraTemporal.setDetalles(carritoCompras);
            compraTemporal.calcularTotales();
            model.addAttribute("success", "Producto removido del carrito");
        }
        
        model.addAttribute("compraDto", new CompraDto());
        model.addAttribute("proveedores", proveedorRepository.findAll());
        model.addAttribute("productos", productoRepository.findAll());
        model.addAttribute("carrito", carritoCompras);
        model.addAttribute("compraTemporal", compraTemporal);
        model.addAttribute("unidadesMedida", List.of("UNIDAD", "CAJA", "PAQUETE", "KILO", "LITRO"));
        
        return "compras/nuevaCompra";
    }
    
    @PostMapping("/finalizar-compra")
    public String finalizarCompra(Model model) {
        try {
            if (carritoCompras.isEmpty()) {
                model.addAttribute("error", "El carrito está vacío");
                return "compras/nuevaCompra";
            }
            
            // Asignar la compra a cada detalle
            for (DetalleCompra detalle : carritoCompras) {
                detalle.setCompra(compraTemporal);
            }
            
            CompraProveedor compraFinalizada = compraService.procesarCompra(compraTemporal);
            
            // Limpiar carrito
            carritoCompras.clear();
            compraTemporal = new CompraProveedor();
            
            return "redirect:/compras/boleta/" + compraFinalizada.getId();
            
        } catch (Exception e) {
            model.addAttribute("error", "Error al finalizar compra: " + e.getMessage());
            
            model.addAttribute("compraDto", new CompraDto());
            model.addAttribute("proveedores", proveedorRepository.findAll());
            model.addAttribute("productos", productoRepository.findAll());
            model.addAttribute("carrito", carritoCompras);
            model.addAttribute("compraTemporal", compraTemporal);
            model.addAttribute("unidadesMedida", List.of("UNIDAD", "CAJA", "PAQUETE", "KILO", "LITRO"));
            
            return "compras/nuevaCompra";
        }
    }
    
    @GetMapping("/cancelar-compra")
    public String cancelarCompra() {
        carritoCompras.clear();
        compraTemporal = new CompraProveedor();
        return "redirect:/compras";
    }
    
    @GetMapping("/boleta/{id}")
    public String mostrarBoleta(@PathVariable Long id, Model model) {
        Optional<CompraProveedor> compraOpt = compraService.obtenerCompraPorId(id);
        if (compraOpt.isPresent()) {
            model.addAttribute("compra", compraOpt.get());
            return "compras/boleta";
        } else {
            return "redirect:/compras?error=Compra+no+encontrada";
        }
    }
    
    @GetMapping("/cancelar/{id}")
    public String cancelarCompraExistente(@PathVariable Long id) {
        compraService.cancelarCompra(id);
        return "redirect:/compras?success=Compra+cancelada+correctamente";
    }
}
