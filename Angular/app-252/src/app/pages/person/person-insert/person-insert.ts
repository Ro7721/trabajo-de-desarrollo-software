import { Component } from '@angular/core';
import { ServicePerson } from '../../service/service-person';
import { Person } from '../../../models/person';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { PersonService } from '../../../service/person-service';
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-person-insert',
  imports: [FormsModule],
  templateUrl: './person-insert.html',
  styleUrl: './person-insert.css',
})
export class PersonInsert {
  newRegister: Person = new Person('', '', '', '', '', true, '');
  constructor(private servicePerson: ServicePerson, private router: Router) {}

  registerPerson() {
    if (!this.validateFields()) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    this.servicePerson.addPersons(
      new Person(
        this.newRegister.firstName,
        this.newRegister.surName,
        this.newRegister.dni,
        this.newRegister.birthDate,
        this.newRegister.email,
        this.newRegister.status,
        this.newRegister.phone
      )
    );

    this.newRegister = new Person('', '', '', '', '', true, '');
    console.log('El usuario registrado exitosamente');
    
    // Redirigir a la lista de personas después de guardar
    this.router.navigate(['person-getall']);
  }

  validateFields(): boolean {
    return (
      this.newRegister.firstName.trim() !== '' &&
      this.newRegister.surName.trim() !== '' &&
      this.newRegister.dni.trim() !== '' &&
      this.newRegister.email.trim() !== '' &&
      this.newRegister.birthDate !== ''
    );
  }
}
