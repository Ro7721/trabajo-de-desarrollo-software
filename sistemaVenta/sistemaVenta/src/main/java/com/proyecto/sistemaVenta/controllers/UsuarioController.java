package com.proyecto.sistemaVenta.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.proyecto.sistemaVenta.models.dto.UsuarioDto;
import com.proyecto.sistemaVenta.services.UsuarioServices;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/usuarios")
public class UsuarioController {
    
    @Autowired
    private UsuarioServices usuarioServices;
    
    // Rutas tradicionales (páginas completas)
    @GetMapping({"", "/"})
    public String listarUsuarios(Model model) {
        List<UsuarioDto> usuarios = usuarioServices.listarUsuarios();
        model.addAttribute("usuarios", usuarios);
        model.addAttribute("roles", usuarioServices.getRolesDisponibles());
        return "usuarios/lista";
    }
    
    @GetMapping("/create")
    public String mostrarFormularioCreacion(Model model) {
        model.addAttribute("usuarioDto", new UsuarioDto());
        model.addAttribute("roles", usuarioServices.getRolesDisponibles());
        return "usuarios/crearUsuario";
    }
    
    // Procesa el formulario de creación (POST)
    @PostMapping("/create")
    public String procesarFormularioCreacion(@Valid @ModelAttribute("usuarioDto") UsuarioDto usuarioDto,
            BindingResult result, Model model, RedirectAttributes redirectAttributes) {
        
        if (result.hasErrors()) {
            model.addAttribute("roles", usuarioServices.getRolesDisponibles());
            return "usuarios/crearUsuario";
        }
        
        try {
            usuarioServices.crearUsuario(usuarioDto);
            redirectAttributes.addFlashAttribute("successMensage", "Usuario registrado satisfactoriamente");
            return "redirect:/dashboard/usuarios";
        } catch (IllegalArgumentException e) {
            model.addAttribute("errorMessage", e.getMessage());
            model.addAttribute("roles", usuarioServices.getRolesDisponibles());
            return "usuarios/crearUsuario";
        }
    }
    
    // Mostrar formulario de edición (GET)
    @GetMapping("/edit/{id}")
    public String mostrarFormularioEdicion(@PathVariable("id") Long id, Model model) {
        try {
            UsuarioDto usuarioDto = usuarioServices.obtenerUsuarioPorId(id);
            model.addAttribute("usuarioDto", usuarioDto);
            model.addAttribute("roles", usuarioServices.getRolesDisponibles());
            return "usuarios/editarUsuario";
        } catch (IllegalArgumentException e) {
            return "redirect:/usuarios";
        }
    }
    
    // Procesar formulario de edición (POST)
    @PostMapping("/edit/{id}")
    public String procesarFormularioEdicion(@PathVariable("id") Long id,
            @Valid @ModelAttribute("usuarioDto") UsuarioDto usuarioDto,
            BindingResult bindingResult, Model model, RedirectAttributes redirectAttributes) {
        
        if (bindingResult.hasErrors()) {
            model.addAttribute("roles", usuarioServices.getRolesDisponibles());
            return "usuarios/editarUsuario";
        }
        
        try {
            usuarioServices.actualizarUsuario(id, usuarioDto);
            redirectAttributes.addFlashAttribute("mensaje", "Usuario actualizado satisfactoriamente");
            return "redirect:/dashboard/usuarios";
        } catch (IllegalArgumentException e) {
            model.addAttribute("errorMessage", e.getMessage());
            model.addAttribute("roles", usuarioServices.getRolesDisponibles());
            return "usuarios/editarUsuario";
        }
    }
    
    // Eliminar usuario (soft delete)
    @GetMapping("/delete/{id}")
    public String eliminarUsuario(@PathVariable("id") Long id, RedirectAttributes redirectAttributes) {
        usuarioServices.eliminarUsuario(id);
        redirectAttributes.addFlashAttribute("mensaje", "Usuario eliminado satisfactoriamente");
        return "redirect:/dashboard/usuarios";
    }
    
    // Activar usuario
    @GetMapping("/activate/{id}")
    public String activarUsuario(@PathVariable("id") Long id, RedirectAttributes redirectAttributes) {
        usuarioServices.cambiarEstadoUsuario(id, "ACTIVO");
        redirectAttributes.addFlashAttribute("mensaje", "Usuario activado satisfactoriamente");
        return "redirect:/dashboard/usuarios";
    }
    
    // Desactivar usuario
    @GetMapping("/deactivate/{id}")
    public String desactivarUsuario(@PathVariable("id") Long id, RedirectAttributes redirectAttributes) {
        usuarioServices.cambiarEstadoUsuario(id, "INACTIVO");
        redirectAttributes.addFlashAttribute("mensaje", "Usuario desactivado satisfactoriamente");
        return "redirect:/dashboard/usuarios";
    }
    // mostrar detalles usuario
    
}