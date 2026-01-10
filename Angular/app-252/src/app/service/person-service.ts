import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Person } from '../models/person';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private http = inject(HttpClient);
  private apiUrll = 'http://localhost:8080/api/persons';

  insertPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.apiUrll}/insert`, person);
  }
  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiUrll}/getAll`);
  }
  deletePerson(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrll}/delete/${id}`);
  }
}
  