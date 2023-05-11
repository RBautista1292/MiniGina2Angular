import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(private router: Router){
    this.forma = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'correo': new FormControl('',[Validators.required,Validators.email]),
      'salaSel': new FormControl(''),
      'date': new FormControl('')
    });
    this.minDate.setHours(9, 0, 0);
    this.maxDate.setHours(21, 0, 0);
    this.defaultDate.setHours(9);
    this.defaultDate.setMinutes(0);
    this.defaultDate.setSeconds(0);
    this.fecha = this.getDisabledDates(new Date());
  }
  guardarCambios():void{
    console.log("metodo guardarCambios");
    console.log(this.forma);
    this.forma.controls['date'].setValue(this.formatDate(this.forma.get('date')?.value));
    console.log(this.forma.value);
    Swal.fire({
      icon: 'success',
      title: 'Su reservación ha sido registrada',
      showConfirmButton: false,
      timer: 2500
    });
    this.router.navigateByUrl('/contenido');
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
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate.replace(',', '');
  }
  
}
