package com.proyecto.sistemaVenta.models.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name="usuario")
@PrimaryKeyJoinColumn(name="IDPERSONA")
public class Usuario  extends Persona{
    
    @Column(length = 20, unique = true, nullable = false)
    private String nombreUsuario;
    @Column(length = 100, nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Rol rol;
    public Usuario(){}
    public Usuario(Long iDPERSONA, String nombre, String apellido, Character sexo, LocalDate fechaNacimiento,
            String nroDocumento, String estadoPersona, String nombreUsuario, String password) {
        super(iDPERSONA, nombre, apellido, sexo, fechaNacimiento, nroDocumento, estadoPersona);
        this.nombreUsuario = nombreUsuario;
        this.password = password;
    }
   
    public String getNombreUsuario() {
        return nombreUsuario;
    }
    public String getPassword() {
        return password;
    }
    
    public Rol getRol() {
        return rol;
    }
    
    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setRol(Rol rol) {
        this.rol = rol;
    }
   
    public enum Rol{
        ADMINISTRADOR, VENDEDOR, ALMACENERO, GERENTE, SOPORTE
    }
}
