package com.epiis.mi_app.model;

import java.io.Serializable;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.PastOrPresent;

@Entity
@Table(name = "usuario")
public class User extends Person implements Serializable {
    public static final long serialVersionUID = 1L;
    @Column(unique = true, name = "email")
    @Email
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "update_date")
    @PastOrPresent
    private LocalDate updateDate;
    @Column(name = "register_date", updatable = false)
    private LocalDate registerDate;
    @Column(name = "active", nullable = false)
    private boolean active;

    public User() {
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDate updateDate) {
        this.updateDate = updateDate;
    }

    public LocalDate getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(LocalDate registerDate) {
        this.registerDate = registerDate;
    }

}
