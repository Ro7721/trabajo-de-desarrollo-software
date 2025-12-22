package com.epiis.practica.responceobject;

import java.util.List;

import com.epiis.practica.model.Person;

public class ResponseStorage {
    private String message;
    private List<Person> personAll;

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public List<Person> getPersonAll() {
        return personAll;
    }
    public void setPersonAll(List<Person> personAll) {
        this.personAll = personAll;
    }

}
