package com.proyecto.sistemaVenta.controllers;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.proyecto.sistemaVenta.models.dto.ProductoDto;
import com.proyecto.sistemaVenta.services.ProductoServices;

import jakarta.validation.Valid;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/productos")
public class ProductoController {
    @Autowired
    private ProductoServices services;

    public ProductoController(ProductoServices productoServices){
        this.services = productoServices;
    } 

    @GetMapping({"", "/"})
    public String productGetAll(Model model){
        List<ProductoDto> productoDto = services.getAllProducts();
        model.addAttribute("productoDto", productoDto);
        model.addAttribute("categorias", services.getCategoriasDisponibles());
        return "/productos/lista";
    }
    @GetMapping("/create")
    public String createProduct(Model model){
        model.addAttribute("productoDto", new ProductoDto());
        model.addAttribute("categorias", services.getCategoriasDisponibles());
        return "/productos/newProduct";
    }
    //procesar el formularion crear producto
    @PostMapping("/create")
    public String createProductPost(@Valid @ModelAttribute("productoDto") ProductoDto productoDto,
            BindingResult result, Model model, RedirectAttributes redirectAttributes) {
        
        if (result.hasErrors()) {

            return "productos/newProduct";
        }

        try {
            MultipartFile file = productoDto.getFileImage();
            if (file != null && !file.isEmpty()) {
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path dir = Paths.get("src/main/resources/static/img");
                Files.createDirectories(dir);
                Path path = dir.resolve(fileName);
                // opción A: usar transferTo
                file.transferTo(path.toFile());
                // opción B: Files.write(path, file.getBytes());
            }

            services.createProduct(productoDto);
            redirectAttributes.addFlashAttribute("successMensage", "Producto registrado satisfactoriamente");
            return "redirect:/dashboard/productos";
        } catch (IllegalArgumentException e) {
            model.addAttribute("errorMessage", e.getMessage());
            return "productos/newProduct";
        } catch (IOException e) {
            model.addAttribute("errorMessage", "Error al guardar la imagen: " + e.getMessage());
            return "productos/newProduct";
        }
    }
}
