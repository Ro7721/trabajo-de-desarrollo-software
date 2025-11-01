package com.proyecto.sistemaVenta.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    // aqui va en mensaje de prueba
    @GetMapping("/test")
    public String test() {
        return "¡La aplicación está funcionando correctamente!";
    }
    
}
