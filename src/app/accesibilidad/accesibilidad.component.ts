import { Component, EventEmitter, Output } from '@angular/core';
import { AccService } from '../shared/acc.service';

@Component({
  selector: 'app-accesibilidad',
  templateUrl: './accesibilidad.component.html',
  styleUrls: ['./accesibilidad.component.css'],
})
export class AccesibilidadComponent {
  //Botones principales
  botonPresionado1: boolean = false;
  botonPresionado2: boolean = false;
  botonPresionado3: boolean = false;
  botonPresionado4: boolean = false;

  //Reaundar, pausar y cancelar
  botonPresionado5: boolean = false;
  botonPresionado6: boolean = false;
  botonPresionado7: boolean = false;

  //Boolean
  lectorPantalla: boolean = true;
  resumirLector: boolean = true;
  pausarLector: boolean = true;
  cancelarLector: boolean = true;

  constructor(public accService: AccService) {}

  //Toggles
  toggleLectorPantalla(): void {
    this.lectorPantalla = !this.lectorPantalla;
    this.botonPresionado1 = !this.botonPresionado1;
    //this.accService.setPoderLeer(this.leerBotonBoolean);
  }

  toggleResumirLector(): void {
    this.resumirLector = !this.resumirLector;
  }

  togglePausarLector(): void {
    this.pausarLector = !this.pausarLector;
  }

  toggleCancelarLector(): void {
    this.cancelarLector = !this.cancelarLector;
  }

  //Toggles

  resumirLector1(): void {
    this.accService.resumirContenido.emit();
    
  }
  pausarLector1(): void {
    this.accService.pausarContenido.emit();
  }

  cancelarLector1(): void {
    this.accService.cancelarContenido.emit();
    this.botonPresionado1 = false;
  }

  leerTexto1(): void {
    if (this.lectorPantalla) {
      this.accService.leerContenido.emit();
    } 
    if(!this.lectorPantalla){
      this.accService.cancelarContenido.emit();
    }

    this.accService.leerContenido.subscribe(() => {
      console.log('Lector Emitido');
    });
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

  botonPresionadoFuncion5(): void {
    this.botonPresionado5 = !this.botonPresionado5;
  }

  botonPresionadoFuncion6(): void {
    this.botonPresionado6 = !this.botonPresionado6;
  }

  botonPresionadoFuncion7(): void {
    this.botonPresionado7 = !this.botonPresionado7;
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
