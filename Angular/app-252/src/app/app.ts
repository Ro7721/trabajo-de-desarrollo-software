import { Component, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  fullName: string ='';
  constructor(){
  }
  ngOnInit(): void{
    this.fullName = 'Roger juro ayquipa';
  }
  changeData(){
    if(this.fullName =='...'){
      this.fullName = "Roger juro ayquipa";
    }else{
      this.fullName = '...';
    }
  }
}

