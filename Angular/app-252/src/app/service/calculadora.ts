import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Calculadora {
  private http = inject(HttpClient); 
  private apiUrl = 'http://localhost:8080/api';
  
  sumar(a: number, b: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/suma?num1=${a}&num2=${b}`);
  }
  mutiplicar(a: number, b: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/multiplicacion?num1=${a}&num2=${b}`);
  }
}
