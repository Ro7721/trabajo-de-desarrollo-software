package com.epiis.practica.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epiis.practica.model.Person;
import com.epiis.practica.responceobject.ResponcePerson;
import com.epiis.practica.responceobject.ResponseStorage;
@RestController
@RequestMapping(path = "persons")
public class PersonController {
    private List<Person> storagePerson = new ArrayList<>();
    @GetMapping(path = "hello")
    public String helloPerson(){
        return "Hello Person";
    }
    @PostMapping(path = "insert", consumes = "multipart/form-data")
    public ResponseEntity<ResponcePerson> insertPerson(@ModelAttribute Person person){
        ResponcePerson personResponce = new ResponcePerson();
        personResponce.setFullName(person.getDni()+" "+ person.getSurName()+" "+person.getDni()+" "+person.getAge());
        if(person.getDni().length() != 8){
            return new ResponseEntity<>(personResponce, HttpStatus.BAD_REQUEST);
        }
        storagePerson.add(person);
        return new ResponseEntity<>(personResponce, HttpStatus.OK);
    }
    @GetMapping(path = "getAll")
    public ResponseEntity<ResponseStorage> getAll(){
        ResponseStorage all = new ResponseStorage();
        all.setMessage("Lista de Personas registradas");
        all.setPersonAll(storagePerson);
        return new ResponseEntity<>(all, HttpStatus.OK);
    }

    @DeleteMapping(path = "delete", consumes = "multipart/form-data")
    public ResponseEntity<String>deletePerson(@RequestParam("dni") String dni){
        Optional<Person> delete = storagePerson.stream()
            .filter(p -> p.getDni().equals(dni)).findFirst();
        if(delete.isPresent()){
            storagePerson.remove(delete.get());
            return ResponseEntity.ok("Persona con dni "+dni+" eliminada");
        }else{
            return ResponseEntity.status(401).body("Persona con dni "+ dni+" no encontrado");
        }
    }
    @PutMapping(path = "update", consumes = "multipart/form-data")
    public ResponseEntity<String> updatePerson(@ModelAttribute Person person){
        Optional<Person> update = storagePerson.stream()
            .filter(p -> p.getDni().equals(person.getDni())).findFirst();

        if(update.isPresent()){
            Person existing = update.get();
            existing.setFirstName(person.getFirstName());
            existing.setSurName(person.getSurName());
            existing.setAge(person.getAge());
            return ResponseEntity.ok("Persona con dni "+ person.getDni()+" actualizada Carrectamente");
        }else{
            return ResponseEntity.status(404).body("Persona con dni "+ person.getDni()+" no encontrado");
        }
    }
    @PostMapping(path = "seach", consumes = "multipart/form-data")
    public ResponseEntity<String> searchPerson(@RequestParam("dni") String dni){
        Optional<Person> search = storagePerson.stream()
            .filter(p -> p.getDni().equals(dni)).findFirst();
        if(search.isPresent()){
            Person found = search.get();
            String result = "Persona encontrada: " + found.getDni() + " " + found.getFirstName() + " " + found.getSurName() + " " + found.getAge();
            return ResponseEntity.ok(result);
        }else{
            return ResponseEntity.status(404).body("Persona con dni "+ dni+" no encontrado");
        }   
    }
    
}
 