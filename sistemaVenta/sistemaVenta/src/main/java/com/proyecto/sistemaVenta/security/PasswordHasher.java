package com.proyecto.sistemaVenta.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordHasher {
    
    private final PasswordEncoder passwordEncoder;

    public PasswordHasher(){
        this.passwordEncoder = new BCryptPasswordEncoder(12);
    }
    // hashea contraseña en texto plano
    public String hashPassword(String plainPassword){
        if(plainPassword == null || plainPassword.trim().isEmpty()){
            throw new IllegalArgumentException("La contraseña no puede estar vacía");
        }
        return passwordEncoder.encode(plainPassword);
    }
    //verifica si la contraseña en texto plano coincide con la hasheada
    public boolean verifyPassword(String plainPassword, String hashPassword){
        if(plainPassword == null || hashPassword == null){
            return false;
        }
        return passwordEncoder.matches(plainPassword, hashPassword);
    }
    //verificca si la constrasena necesita actualizar(caundo cambia el valor de coste)
    public boolean needsUpgrade(String hashPassword){
        return passwordEncoder.upgradeEncoding(hashPassword);
    }
    //
    public PasswordEncoder getPasswordEncoder() {
        return this.passwordEncoder;
    }
}
