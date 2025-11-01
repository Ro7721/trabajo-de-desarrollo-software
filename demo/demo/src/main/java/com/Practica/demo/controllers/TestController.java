package com.Practica.demo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class TestController {
    @GetMapping("/test")
    public String testConnection() {
        return "¡Conexión exitosa! Aplicación funcionando en puerto 8080";
    }
}
