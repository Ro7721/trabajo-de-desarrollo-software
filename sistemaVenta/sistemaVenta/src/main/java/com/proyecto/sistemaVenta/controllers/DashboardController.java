package com.proyecto.sistemaVenta.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.proyecto.sistemaVenta.security.CustomUserDetails;
import com.proyecto.sistemaVenta.services.ProductoServices;
import com.proyecto.sistemaVenta.services.UsuarioServices;
import com.proyecto.sistemaVenta.models.dto.ProductoDto;
import com.proyecto.sistemaVenta.models.dto.UsuarioDto;
import com.proyecto.sistemaVenta.models.entity.Usuario;

@Controller
@RequestMapping("/dashboard")
public class DashboardController {
    @Autowired
    private UsuarioServices usuarioServices;
    @Autowired
    private ProductoServices productoServices;

    @GetMapping({"", "/"})
    public String dashboard(Authentication authentication, Model model) {
        addUserAttributes(authentication, model);
        return "dashboard/dashboardAdmi";
    }
    
    // Endpoints para contenido dinámico - DEBEN retornar fragments directamente
    @GetMapping("/main")
    public String mainContent(Model model) {
        return "dashboard/main :: content";
    }
    
    @GetMapping("/usuarios")
    public String listaUsuariosDashboard(Model model) {
        // NO uses redirect, retorna el fragment directamente
        List<UsuarioDto> usuarios = usuarioServices.listarUsuarios();
        model.addAttribute("usuarios", usuarios);
        model.addAttribute("roles", usuarioServices.getRolesDisponibles());
        return "usuarios/lista :: content";
    }
    
    @GetMapping("/usuarios/create")
    public String crearUsuarioDashboard(Model model) {
        // NO uses redirect, retorna el fragment directamente
        model.addAttribute("usuarioDto", new UsuarioDto());
        model.addAttribute("roles", usuarioServices.getRolesDisponibles());
        return "usuarios/crearUsuario :: content";
    }
    @GetMapping("/productos/create")
    public String crearProductoDashboard(Model model){
        model.addAttribute("productoDto", new ProductoDto());
        model.addAttribute("categorias", productoServices.getCategoriasDisponibles());
        return "productos/newProduct :: content";
    }
    @GetMapping("/usuarios/edit/{id}")
    public String editarUsuarioDashboard(@PathVariable("id") Long id, Model model){
        model.addAttribute("usuarioDto", usuarioServices.obtenerUsuarioPorId(id));
        model.addAttribute("roles", usuarioServices.getRolesDisponibles());
        return "usuarios/editarUsuario :: content";
    }

    @GetMapping("/usuarios/view/{id}")
    public String verDetalleUsuario(@PathVariable("id") Long id , Model model){
        try{   
            UsuarioDto usuarioDto = usuarioServices.obtenerUsuarioPorId(id);
            model.addAttribute("usuario", usuarioDto);
            model.addAttribute("roles", usuarioServices.getRolesDisponibles());
            return "usuarios/detalles :: content";
        }catch(IllegalArgumentException e){
            model.addAttribute("errorMessage", "Usuario no encotrado");
            return "redirect:/dashboard/usuarios";
        }
    }
    
    
    private void addUserAttributes(Authentication authentication, Model model) {
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            
            if (principal instanceof CustomUserDetails) {
                CustomUserDetails userDetails = (CustomUserDetails) principal;
                Usuario usuario = userDetails.getUsuario();
                
                model.addAttribute("nombreUsuario", usuario.getNombre() + " " + usuario.getApellido());
                model.addAttribute("rolUsuario", usuario.getRol().name());
                model.addAttribute("inicialesUsuario", getIniciales(usuario.getNombre(), usuario.getApellido()));
            }
        } else {
            model.addAttribute("nombreUsuario", "Usuario");
            model.addAttribute("rolUsuario", "Administrador");
            model.addAttribute("inicialesUsuario", "AU");
        }
    }

    private String getIniciales(String nombre, String apellido) {
        if (nombre == null || apellido == null) return "AU";
        String inicialNombre = !nombre.isEmpty() ? nombre.substring(0, 1) : "";
        String inicialApellido = !apellido.isEmpty() ? apellido.substring(0, 1) : "";
        return (inicialNombre + inicialApellido).toUpperCase();
    }

}