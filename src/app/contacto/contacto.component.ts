import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccService } from '../shared/acc.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  forma!: FormGroup;
  
  constructor(public accService: AccService){
    this.forma = new FormGroup({
    'nombre': new FormControl('', [Validators.required, Validators.minLength(5)] ),
    'correo': new FormControl('', [Validators.required, Validators.email] ),
    'duda': new FormControl('', Validators.required ),
    });
    } 

  guardarCambios():void{
    
  }
}
