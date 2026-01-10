import { Component, OnInit } from '@angular/core';
import { Person } from '../../../models/person';
import { CommonModule } from '@angular/common';
import { ServicePerson } from '../../service/service-person';
@Component({
  selector: 'app-person-getall',
  imports: [CommonModule],
  templateUrl: './person-getall.html',
  styleUrl: './person-getall.css',
})
export class PersonGetall implements OnInit {
  persons: Person[] = [];
  constructor(private servicePerson: ServicePerson) {}
  ngOnInit(): void {
    this.persons = this.servicePerson.getPersons();
  }
  /*persons: Person[] =[
    new Person('John', 'huamani suares', '12345678A',new Date(1990, 0, 1),'jhon@gmail.com',true,'987654321'),
    new Person('Jane', 'doe smith', '87654321B',new Date(1985, 4, 15),'jane@gmail.com',false,'123456789'),
    new Person('Alice', 'johnson brown', '11223344C',new Date(1992, 6, 20),'alice@gmail.com',true,'456789123'),
    new Person('Bob', 'williams davis', '44332211D',new Date(1988, 10, 30),'bob@gmail.com', true,'789123456')
  ];*/
}
