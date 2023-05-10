import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent {
  forma!: FormGroup;
  fecha!: Date;

  constructor(){
    this.forma = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'correo': new FormControl('',[Validators.required,Validators.email]),
      'salaSel': new FormControl(''),
      'date': new FormControl('')
    });
    this.fecha = new Date();
  }
  guardarCambios():void{
    console.log("metodo guardarCambios");
    console.log(this.forma);
    console.log(this.forma.value);
  }

}
