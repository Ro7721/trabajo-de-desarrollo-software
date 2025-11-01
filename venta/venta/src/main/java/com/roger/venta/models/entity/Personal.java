package com.roger.venta.models.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name="personal")
@PrimaryKeyJoinColumn(name="IDPERSONA")
public class Personal extends Persona {
    @Column(length = 20, unique = true, nullable = false)
    private String nombreUsuario;
    @Column(length = 100, nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Rol rol;

    public Personal(Long iDPERSONA, String nombre, String apellido, char sexo, LocalDate fechaNacimiento,
            String nroDocumento, String estado, String nombreUsuario, String password, Rol rol) {
        super(iDPERSONA, nombre, apellido, sexo, fechaNacimiento, nroDocumento, estado);
        this.nombreUsuario = nombreUsuario;
        this.password = password;
        this.rol = rol;
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

    public enum Rol {
        ADMINISTRADOR, VENDEDOR, ALMACENERO, GERENTE, SOPORTE
    }
}
