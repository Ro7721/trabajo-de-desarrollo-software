package com.proyecto.sistemaVenta.models.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class UsuarioDto {
    private Long id;
    @NotEmpty(message = "El nombre no puede estar vacio")
    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres")
    private String nombre;
    @NotEmpty(message = "El apellido no puede estar vacio")
    @Size(min = 3, max = 50, message = "El apellido debe tener entre 3 y 50 caracteres")
    private String apellido;
    private Character sexo;
    private LocalDate fechaNacimiento;
    @NotEmpty(message = "El numero de documento no puede estar vacio")
    @Size(min = 8, max = 12, message = "El numero de documento debe tener entre 8 y 12 caracteres")
    private String nroDocumento;
    @NotEmpty(message = "El nombre de usuario no puede estar vacio")
    @Size(min = 5, max = 20, message = "El nombre de usuario debe tener entre 5 y 20 caracteres")
    private String nombreUsuario;
    private String rol;
    @NotEmpty(message = "La contraseña no puede estar vacia")
    @Size(min = 8, max = 20, message = "La contraseña debe tener entre 8 y 20 caracteres")
    private String password;
    private String estado;
    private boolean activo;

    
    public String getEstado() {
        return estado;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }
    public void setActivo(boolean activo){
        this.activo = activo;
        this.estado = activo ? "ACTIVO":"INACTIVO";
    }
    public boolean isActivo(){
        return activo;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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
    public String getNombreUsuario() {
        return nombreUsuario;
    }
    public String getRol() {
        return rol;
    }
   
    public String getPassword() {
        return password;
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
    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }
    public void setRol(String rol) {
        this.rol = rol;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    //Metodo de utilidad
    public String getNombreCompleto(){
        return nombre+" "+apellido;
    }
    public String getSexoDisplay(){
        return sexo == 'M'? "Masculino": "Femenino";
    }
    public int getEdad(){
        if(fechaNacimiento == null) return 0;
        return LocalDate.now().getYear() - fechaNacimiento.getYear();
    }

}
