import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccService {

  letraGrandeBooleanServicio: boolean = false;
  linkResaltadoBooleanServicio: boolean = false;
  alinearTextoBooleanServicio: boolean = false;
  ambosBoolean: boolean = false;


  constructor() {
    this.ambosBoolean = this.letraGrandeBooleanServicio && this.linkResaltadoBooleanServicio;
   }

  getletraGrandeBooleanServicio(){
    return this.letraGrandeBooleanServicio;
  }

  setletraGrandeBooleanServicio(valor: boolean){
    this.letraGrandeBooleanServicio = valor;
  }

  





}
