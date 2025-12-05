package com.Practica.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.Practica.demo.models.Producto;
import com.Practica.demo.models.ProductoDto;
import com.Practica.demo.services.ProductoRepository;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    // ✅ Lista de productos
    @GetMapping({ "", "/" })
    public String listarProductos(Model model) {
        List<Producto> productos = productoRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        model.addAttribute("productos", productos);
        model.addAttribute("totalProductos", productoRepository.count());
        return "productos/index";
    }

    // ✅ MOSTRAR formulario de creación
    @GetMapping("/create")
    public String mostrarFormularioCreacion(Model model) {
        ProductoDto productoDto = new ProductoDto();
        model.addAttribute("productoDto", productoDto);
        return "productos/crearProducto";
    }

    // ✅ PROCESAR formulario de creación
    @PostMapping("/create")
    public String crearProducto(@Valid @ModelAttribute("productoDto") ProductoDto productoDto,
            BindingResult result,
            Model model) {

        if (result.hasErrors()) {
            model.addAttribute("productoDto", productoDto);
            return "productos/crearProducto";
        }

        // Convertir ProductoDto a Producto
        Producto producto = new Producto();
        producto.setNombre(productoDto.getNombre());
        producto.setDescripcion(productoDto.getDescripcion());
        producto.setCategoria(productoDto.getCategoria());
        producto.setMarca(productoDto.getMarca());
        producto.setPrecio(productoDto.getPrecio());
        producto.setStock(productoDto.getStock());

        // ✅ Guardar imagen si se subió
        if (productoDto.getImagen() != null && !productoDto.getImagen().isEmpty()) {
            try {
                String fileName = System.currentTimeMillis() + "_" + productoDto.getImagen().getOriginalFilename();
                String uploadDir = "uploads/"; // 📂 Carpeta dentro de /resources/static o externa
                java.nio.file.Path path = java.nio.file.Paths.get(uploadDir, fileName);
                java.nio.file.Files.createDirectories(path.getParent());
                productoDto.getImagen().transferTo(path.toFile());

                // Guardar ruta relativa
                producto.setImagen("/uploads/" + fileName);
            } catch (Exception e) {
                e.printStackTrace();
                producto.setImagen("/images/default-product.png");
            }
        } else {
            producto.setImagen("/images/default-product.png");
        }

        productoRepository.save(producto);
        return "redirect:/productos";
    }

    // FILTRAR por categoria
    @GetMapping("/filter")
    public String filtrarPorCategoria(@ModelAttribute("categoria") String categoria, Model model) {
        if (categoria == null || categoria.trim().isEmpty()) {
            return "redirect:/productos";
        }

        List<Producto> productos = productoRepository.findByCategoria(categoria);
        if (productos != null && !productos.isEmpty()) {
            model.addAttribute("productos", productos);
        } else {
            model.addAttribute("productos", List.of());
            model.addAttribute("error", "No se encontró ningún producto en esa categoría");
        }
        return "productos/index";
    }

    // ✅ MOSTRAR formulario de EDICIÓN
    @GetMapping("/edit/{id}")
    public String mostrarFormularioEdicion(@PathVariable("id") Long id, Model model) {
        try {
            Optional<Producto> productoOpt = productoRepository.findById(id.intValue());
            if (productoOpt.isPresent()) {
                Producto producto = productoOpt.get();
                ProductoDto productoDto = new ProductoDto();

                // Copiar datos del producto al DTO
                productoDto.setNombre(producto.getNombre());
                productoDto.setDescripcion(producto.getDescripcion());
                productoDto.setCategoria(producto.getCategoria());
                productoDto.setMarca(producto.getMarca());
                productoDto.setPrecio(producto.getPrecio());
                productoDto.setStock(producto.getStock());

                model.addAttribute("productoDto", productoDto);
                model.addAttribute("productoId", id);
                return "productos/editarProducto";
            } else {
                return "redirect:/productos?error=Producto+no+encontrado";
            }
        } catch (Exception e) {
            return "redirect:/productos?error=Error+al+cargar+producto";
        }
    }

    // ✅ PROCESAR formulario de EDICIÓN
    @PostMapping("/edit/{id}")
    public String actualizarProducto(@PathVariable("id") Long id,
            @Valid @ModelAttribute("productoDto") ProductoDto productoDto,
            BindingResult result,
            Model model) {

        if (result.hasErrors()) {
            model.addAttribute("productoDto", productoDto);
            model.addAttribute("productoId", id);
            return "productos/editarProducto";
        }

        try {
            Optional<Producto> productoOpt = productoRepository.findById(id.intValue());
            if (productoOpt.isPresent()) {
                Producto producto = productoOpt.get();

                // Actualizar datos del producto
                producto.setNombre(productoDto.getNombre());
                producto.setDescripcion(productoDto.getDescripcion());
                producto.setCategoria(productoDto.getCategoria());
                producto.setMarca(productoDto.getMarca());
                producto.setPrecio(productoDto.getPrecio());
                producto.setStock(productoDto.getStock());

                productoRepository.save(producto);
                return "redirect:/productos?success=Producto+actualizado+correctamente";
            } else {
                return "redirect:/productos?error=Producto+no+encontrado";
            }
        } catch (Exception e) {
            return "redirect:/productos?error=Error+al+actualizar+producto";
        }
    }

    // Buscar producto por nombre
    @GetMapping("/search")
    public String buscarProducto(@ModelAttribute("nombre") String nombre, Model model) {
        if (nombre == null || nombre.trim().isEmpty()) {
            return "redirect:/productos";
        }

        List<Producto> productos = productoRepository.findByNombreContainingIgnoreCase(nombre);
        if (productos != null && !productos.isEmpty()) {
            model.addAttribute("productos", productos);
        } else {
            model.addAttribute("productos", List.of());
            model.addAttribute("error", "No se encontró ningún producto con ese nombre");
        }
        return "productos/index";
    }

    // ✅ ELIMINAR producto
    @GetMapping("/delete/{id}")
    public String eliminarProducto(@PathVariable("id") Long id) {
        try {
            Optional<Producto> productoOpt = productoRepository.findById(id.intValue());
            if (productoOpt.isPresent()) {
                productoRepository.deleteById(id.intValue());
                return "redirect:/productos?success=Producto+eliminado+correctamente";
            } else {
                return "redirect:/productos?error=Producto+no+encontrado";
            }
        } catch (Exception e) {
            return "redirect:/productos?error=Error+al+eliminar+producto";
        }
    }

}