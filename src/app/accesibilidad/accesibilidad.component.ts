import { Component, EventEmitter, Output } from '@angular/core';
import { AccService } from '../shared/acc.service';

@Component({
  selector: 'app-accesibilidad',
  templateUrl: './accesibilidad.component.html',
  styleUrls: ['./accesibilidad.component.css'],
})
export class AccesibilidadComponent {
  botonPresionado1: boolean = false;
  botonPresionado2: boolean = false;
  botonPresionado3: boolean = false;
  botonPresionado4: boolean = false;

  constructor(public accService: AccService) {}

  @Output() lectorTexto = new EventEmitter();

  leerTexto1(): void {
    this.lectorTexto.emit();
    console.log(this.lectorTexto);
  }

  botonPresionadoFuncion1(): void {
    this.botonPresionado1 = !this.botonPresionado1;
  }

  botonPresionadoFuncion2(): void {
    this.botonPresionado2 = !this.botonPresionado2;
  }

  botonPresionadoFuncion3(): void {
    this.botonPresionado3 = !this.botonPresionado3;
  }

  botonPresionadoFuncion4(): void {
    this.botonPresionado4 = !this.botonPresionado4;
  }

  agrandarTexto2(): void {
    this.accService.letraGrandeBooleanServicio =
      !this.accService.letraGrandeBooleanServicio;
    console.log(
      'Agrandar Texto: ' + this.accService.letraGrandeBooleanServicio
    );
  }

  resaltarEnlaces1(): void {
    this.accService.linkResaltadoBooleanServicio =
      !this.accService.linkResaltadoBooleanServicio;
    console.log(
      'Resaltar Enlaces: ' + this.accService.linkResaltadoBooleanServicio
    );
  }

  alinearTexto1(): void {
    this.accService.alinearTextoBooleanServicio =
      !this.accService.alinearTextoBooleanServicio;
    console.log(
      'Alinear Texto: ' + this.accService.alinearTextoBooleanServicio
    );
  }

  cancelarVoz(): any {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  }

  pausarVoz(): void {
    if ('speechSynthesis' in window) {
      speechSynthesis.pause();
    }
  }

  reanudarVoz(): void {
    if ('speechSynthesis' in window) {
      speechSynthesis.resume();
    }
  }
}
