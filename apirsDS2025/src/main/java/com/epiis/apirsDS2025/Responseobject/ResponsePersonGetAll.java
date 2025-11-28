package com.epiis.apirsDS2025.Responseobject;

import java.util.List;

import com.epiis.apirsDS2025.requestobject.RequestPersonInsert;

public class ResponsePersonGetAll {
    private String welcome;
    private List<RequestPersonInsert> personas;
    private int total;

    public List<RequestPersonInsert> getPersonas() {
        return personas;
    }

    public void setPersonas(List<RequestPersonInsert> personas) {
        this.personas = personas;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public String getWelcome() {
        return welcome;
    }

    public void setWelcome(String welcome) {
        this.welcome = welcome;
    }

}
