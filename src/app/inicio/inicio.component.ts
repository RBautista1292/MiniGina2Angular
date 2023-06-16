import { Component, OnInit } from '@angular/core';
import { AccService } from '../shared/acc.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  dataUser!: any;
  constructor(public accService: AccService, private afAuth: AngularFireAuth, public session: SessionService){}
  
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
    const elementosTexto = Array.from(document.querySelectorAll('h1, h3, h5, h6, a, p, .p-card, span'))
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

  desplazar(): void {
    window.scroll({
      top: 800,
      left: 0,
      behavior: 'smooth',
    });
  }
}
