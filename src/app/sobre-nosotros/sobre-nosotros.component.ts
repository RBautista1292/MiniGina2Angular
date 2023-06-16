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

  
  textoHTML: string = "";

  
  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });



   this.leerElementosHTML();

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

  leerElementosHTML(): void{
    const elementosTexto = Array.from(document.querySelectorAll('h1, h3, p, .p-card'))
    .filter(elemento => {
      const texto = elemento.textContent?.trim();
      return texto !== '';
    })
    .map(elemento => elemento.textContent?.trim());

  this.textoHTML = elementosTexto.join('. ');

  
  }

  leerContenidoCommponente(): void {
    const parrafo = new SpeechSynthesisUtterance();
    parrafo.text = this.textoHTML;
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
