import { Component, Input, OnInit } from '@angular/core';
import { AccService } from '../shared/acc.service';

declare const speechSynthesis: any;

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.css'],
})
export class SobreNosotrosComponent implements OnInit {
  constructor(public accService: AccService) {}

  texto: boolean = this.accService.letraGrandeBooleanServicio;
  enlaces: boolean = this.accService.linkResaltadoBooleanServicio;
  alineado: boolean = this.accService.alinearTextoBooleanServicio;

  texto2: string =
    'El siguiente sitio forma parte de un proyecto académico, no está relacionado a ningún negocio ni organización con fines de lucro';

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    this.accService.leerContenido.subscribe(() => {
      this.leerContenidoCommponente();
      console.log('Evento Recibido');
    });

    this.accService.resumirContenido.subscribe(() => {
      this.reanudarVoz();
    });

    this.accService.pausarContenido.subscribe(() => {
      this.pausarVoz();
    });

    this.accService.cancelarContenido.subscribe(() => {
      this.cancelarVoz();
    });
  }

  leerContenidoCommponente(): void {
    const parrafo = new SpeechSynthesisUtterance();
    parrafo.text = this.texto2;
    speechSynthesis.speak(parrafo);
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
