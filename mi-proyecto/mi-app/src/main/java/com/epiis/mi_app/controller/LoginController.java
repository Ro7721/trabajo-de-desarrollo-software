package com.epiis.mi_app.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    private String getInitials(String name, String surName) {
        if (name == null || surName == null) {
            return "AU";
        }
        return null;
    }
}
