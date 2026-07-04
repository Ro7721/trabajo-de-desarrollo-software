package com.epiis.mi_app.model;

import java.io.Serializable;
import java.time.LocalDate;

import jakarta.persistence.Column;

import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
public abstract class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_person", nullable = false, unique = true, length = 50)
    private String idPerson;
    @Column(name = "firstname", nullable = false)
    private String firstName;
    @Column(name = "surname", nullable = false)
    private String surname;
    @Column(name = "dni", length = 8, nullable = false)
    private String dni;
    @Column(name = "phone", nullable = false)
    private String phone;
    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

}
