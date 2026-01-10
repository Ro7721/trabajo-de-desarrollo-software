import { Injectable } from '@angular/core';
import { Person } from '../../models/person';
@Injectable({
  providedIn: 'root',
})
export class ServicePerson {
  private persons: Person[] =[];
  //metodos para listar
  getPersons(): Person[] {
    return this.persons;
  }
  //metodo para agregar
  addPersons(person: Person){
    this.persons.push(person);
  }
  
  deletePersons(index: number){
    this.persons.splice(index,1);
  }
}
