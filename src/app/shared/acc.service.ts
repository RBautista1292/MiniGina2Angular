import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccService {

  letraGrandeBooleanServicio!: boolean;
  


  constructor() { }

  getletraGrandeBooleanServicio(){
    return this.letraGrandeBooleanServicio;
  }

  setletraGrandeBooleanServicio(valor: boolean){
    this.letraGrandeBooleanServicio = valor;
  }
}
