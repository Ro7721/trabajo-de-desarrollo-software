import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Calculadora } from '../service/calculadora';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-suma',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './suma.html',
  styleUrl: './suma.css',
})
export class Suma {
  private calculadora = inject(Calculadora);

  
  number1: number =0;
  number2: number = 0;
  result: number | null = null;
  realizarSuma() {
    this.calculadora.sumar(this.number1, this.number2).subscribe((res) => {
      this.result = res;
    });
  }
  realizarMultiplicacion(){
    this.calculadora.mutiplicar(this.number1, this.number2).subscribe((res)=>{
      this.result = res;
    });
  }
}
