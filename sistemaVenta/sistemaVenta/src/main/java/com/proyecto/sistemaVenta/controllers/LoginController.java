package com.proyecto.sistemaVenta.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {
    
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
    
    @GetMapping("/login")
    public String mostrarLogin(){
        logger.info(" Accediendo a página de login");
        return "login/login";
    }
    //  Página de inicio redirige al dashboard
    @GetMapping("/")
    public String home() {
        return "redirect:/dashboard";
    }
}