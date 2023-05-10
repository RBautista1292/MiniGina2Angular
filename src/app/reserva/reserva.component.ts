import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent {
  forma!: FormGroup;

  constructor(){
    this.forma = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'apellido': new FormControl('', Validators.required ),
      'correo': new FormControl('',[Validators.required,Validators.email]),
      'date': new FormControl('', Validators.required)
    });
  }
  guardarCambios():void{
    console.log("metodo guardarCambios");
    console.log(this.forma);
    console.log(this.forma.value);
  }

}
