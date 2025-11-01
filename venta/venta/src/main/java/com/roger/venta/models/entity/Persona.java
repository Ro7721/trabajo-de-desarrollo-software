package com.roger.venta.models.entity;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name="persona")
@Inheritance(strategy = InheritanceType.JOINED)
public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IDPERSONA;
    @Column(length = 50)
    private String nombre;
    @Column(length = 50)
    private String apellido;
    @Column(length = 1)
    private Character sexo;
    @Column(name="fecha_nacimiento")
    private LocalDate fechaNacimiento;
    @Column(length = 12, unique = true)
    private String nroDocumento;
    @Column(length = 20)
    private String estado;
    public Persona(){}
    public Persona(Long iDPERSONA, String nombre, String apellido, char sexo, LocalDate fechaNacimiento, String nroDocumento,
            String estado) {
        IDPERSONA = iDPERSONA;
        this.nombre = nombre;
        this.apellido = apellido;
        this.sexo = sexo;
        this.fechaNacimiento = fechaNacimiento;
        this.nroDocumento = nroDocumento;
        this.estado = estado;
    }
    public Long getIDPERSONA() {
        return IDPERSONA;
    }
    public String getNombre() {
        return nombre;
    }
    public String getApellido() {
        return apellido;
    }
    public Character getSexo() {
        return sexo;
    }
    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }
    public String getNroDocumento() {
        return nroDocumento;
    }
    public String getEstado() {
        return estado;
    }
    public void setIDPERSONA(Long iDPERSONA) {
        IDPERSONA = iDPERSONA;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public void setApellido(String apellido) {
        this.apellido = apellido;
    }
    public void setSexo(Character sexo) {
        this.sexo = sexo;
    }
    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }
    public void setNroDocumento(String nroDocumento) {
        this.nroDocumento = nroDocumento;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }
}
