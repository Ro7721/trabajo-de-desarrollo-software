package com.Practica.demo.controllers;

import com.Practica.demo.models.Proveedor;
import com.Practica.demo.repositories.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/proveedores")
public class ProveedorController {
    
    @Autowired
    private ProveedorRepository proveedorRepository;
    
    @GetMapping({"", "/"})
    public String listarProveedores(Model model) {
        List<Proveedor> proveedores = proveedorRepository.findAll();
        model.addAttribute("proveedores", proveedores);
        return "proveedores/index";
    }
    
    @GetMapping("/create")
    public String mostrarFormularioCreacion(Model model) {
        model.addAttribute("proveedor", new Proveedor());
        return "proveedores/crearProveedor";
    }
    
    @PostMapping("/create")
    public String crearProveedor(@Valid @ModelAttribute Proveedor proveedor, 
                                BindingResult result, 
                                RedirectAttributes redirectAttributes) {
        
        // Validar RUC único
        if (proveedor.getRuc() != null && 
            proveedorRepository.findByRuc(proveedor.getRuc()).isPresent()) {
            result.rejectValue("ruc", "error.proveedor", "El RUC ya está registrado");
        }
        
        if (result.hasErrors()) {
            return "proveedores/crearProveedor";
        }
        
        proveedorRepository.save(proveedor);
        redirectAttributes.addFlashAttribute("success", "Proveedor creado correctamente");
        return "redirect:/proveedores";
    }
    
    @GetMapping("/edit/{id}")
    public String mostrarFormularioEdicion(@PathVariable Long id, Model model) {
        Optional<Proveedor> proveedorOpt = proveedorRepository.findById(id);
        if (proveedorOpt.isPresent()) {
            model.addAttribute("proveedor", proveedorOpt.get());
            return "proveedores/editarProveedor";
        }
        return "redirect:/proveedores?error=Proveedor+no+encontrado";
    }
    
    @PostMapping("/edit/{id}")
    public String actualizarProveedor(@PathVariable Long id, 
                                     @Valid @ModelAttribute Proveedor proveedor,
                                     BindingResult result,
                                     RedirectAttributes redirectAttributes) {
        
        // Validar RUC único (excluyendo el actual)
        Optional<Proveedor> proveedorExistente = proveedorRepository.findByRuc(proveedor.getRuc());
        if (proveedorExistente.isPresent() && !proveedorExistente.get().getId().equals(id)) {
            result.rejectValue("ruc", "error.proveedor", "El RUC ya está registrado");
        }
        
        if (result.hasErrors()) {
            return "proveedores/editarProveedor";
        }
        
        proveedor.setId(id);
        proveedorRepository.save(proveedor);
        redirectAttributes.addFlashAttribute("success", "Proveedor actualizado correctamente");
        return "redirect:/proveedores";
    }
    
    @GetMapping("/delete/{id}")
    public String eliminarProveedor(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            Optional<Proveedor> proveedorOpt = proveedorRepository.findById(id);
            if (proveedorOpt.isPresent()) {
                Proveedor proveedor = proveedorOpt.get();
                
                // Verificar si tiene compras asociadas
                if (!proveedor.getCompras().isEmpty()) {
                    redirectAttributes.addFlashAttribute("error", 
                        "No se puede eliminar el proveedor porque tiene compras asociadas");
                    return "redirect:/proveedores";
                }
                
                proveedorRepository.deleteById(id);
                redirectAttributes.addFlashAttribute("success", "Proveedor eliminado correctamente");
            } else {
                redirectAttributes.addFlashAttribute("error", "Proveedor no encontrado");
            }
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error al eliminar el proveedor");
        }
        return "redirect:/proveedores";
    }
}