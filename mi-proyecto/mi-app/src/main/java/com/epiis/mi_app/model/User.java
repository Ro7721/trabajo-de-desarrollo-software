package com.epiis.mi_app.model;

import java.io.Serializable;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "usuario")
@Getter
@Setter
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

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role = Role.ROLE_ADMIN;

    public User() {
        super();
    }

}
