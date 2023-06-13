import { Component, EventEmitter, Output } from '@angular/core';
import { AccService } from '../shared/acc.service';


@Component({
  selector: 'app-accesibilidad',
  templateUrl: './accesibilidad.component.html',
  styleUrls: ['./accesibilidad.component.css']
})
export class AccesibilidadComponent {

  constructor(private accService: AccService) { }

  @Output() lectorTexto = new EventEmitter();
  @Output() agrandarTexto = new EventEmitter();
  @Output() resaltarEnlaces = new EventEmitter();
  @Output() alinearTexto= new EventEmitter();


  leerTexto1(): void{
    this.lectorTexto.emit();
    console.log(this.lectorTexto);
  }

  agrandarTexto1(): void{
    this.agrandarTexto.emit();
    console.log(this.agrandarTexto);
  }

  agrandarTexto2(): void{
    this.accService.letraGrandeBooleanServicio = !this.accService.letraGrandeBooleanServicio;
    console.log(this.accService.letraGrandeBooleanServicio);
  }

  resaltarEnlaces1(): void{
    this.resaltarEnlaces.emit();
    console.log(this.resaltarEnlaces);
  }

  alinearTexto1(): void{
    this.alinearTexto.emit();
    console.log(this.alinearTexto);

  }



  cancelarVoz(): any{
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
  }
  }


  pausarVoz(): void{
    if ('speechSynthesis' in window){
      speechSynthesis.pause();
    }
  }

  reanudarVoz(): void{
    if('speechSynthesis' in window){
      speechSynthesis.resume();
    }
  }




}
