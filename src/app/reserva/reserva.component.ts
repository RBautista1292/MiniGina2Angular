import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent {
  forma!: FormGroup;
  fecha!: Date[];
  minDate: Date = new Date();
  maxDate: Date = new Date();
  defaultDate: Date = new Date();

  constructor(){
    this.forma = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'correo': new FormControl('',[Validators.required,Validators.email]),
      'salaSel': new FormControl(''),
      'date': new FormControl('')
    });
    this.minDate.setHours(10, 0, 0);
    this.maxDate.setHours(22, 0, 0);
    this.defaultDate.setHours(10);
    this.defaultDate.setMinutes(0);
    this.defaultDate.setSeconds(0);
    this.fecha = this.getDisabledDates(new Date());
  }
  guardarCambios():void{
    console.log("metodo guardarCambios");
    console.log(this.forma);
    console.log(this.forma.value);
  }
  disabledDates = (date: Date) => {
    const currentDate = new Date();
    const disabledDates = Array.from(
      { length: Math.ceil((date.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)) },
      (_, index) => new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + index)
    );
    return disabledDates;
  }
  getDisabledDates(date: Date): Date[] {
    return this.disabledDates(date);
  }
  
}
