package com.epiis.mi_app.model;

import java.io.Serializable;
import java.time.LocalDate;

import jakarta.persistence.Column;

import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
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

    public String getIdPerson() {
        return idPerson;
    }

    public void setIdPerson(String idPerson) {
        this.idPerson = idPerson;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

}
