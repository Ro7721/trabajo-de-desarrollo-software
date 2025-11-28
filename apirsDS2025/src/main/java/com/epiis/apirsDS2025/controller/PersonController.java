package com.epiis.apirsDS2025.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epiis.apirsDS2025.Responseobject.ResponsePersonGetAll;
import com.epiis.apirsDS2025.Responseobject.ResponsePersonInsert;
import com.epiis.apirsDS2025.requestobject.RequestPersonInsert;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping(path = "person")
public class PersonController {
    List<RequestPersonInsert> persons = new ArrayList<>();

    @PostMapping(path = "insert", consumes = "multipart/form-data")
    public ResponseEntity<ResponsePersonInsert> insert(@ModelAttribute RequestPersonInsert request) {

        ResponsePersonInsert insert = new ResponsePersonInsert();
        String fulName = request.getDni() + " " + request.getFirstName() + " " + request.getSurName();
        insert.setFullName(fulName);
        persons.add(request);
        return new ResponseEntity<>(insert, HttpStatus.OK);
    }

    @GetMapping(path = "all")
    public ResponseEntity<ResponsePersonGetAll> getAll() {
        ResponsePersonGetAll response = new ResponsePersonGetAll();
        response.setPersonas(persons);
        response.setTotal(persons.size());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "find")
    public ResponseEntity<?> findByDni(@RequestParam String dni) {
        return persons.stream()
                .filter(p -> p.getDni().equalsIgnoreCase(dni))
                .findFirst()
                .map(person -> new ResponseEntity<>(person, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping(path = "delete")
    public ResponseEntity<String> deletePerson(@RequestParam String dni) {
        boolean removed = persons.removeIf(p -> p.getDni().equalsIgnoreCase(dni));
        if (removed) {
            return new ResponseEntity<>("Persona eliminada", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No se encontro la persona con el DNI ", HttpStatus.NOT_FOUND);
        }
    }

}
