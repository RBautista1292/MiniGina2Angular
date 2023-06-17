import { Component, OnInit } from '@angular/core';
import { AccService } from '../shared/acc.service';

@Component({
  selector: 'app-citas-registradas',
  templateUrl: './citas-registradas.component.html',
  styleUrls: ['./citas-registradas.component.css'],
})
export class CitasRegistradasComponent implements OnInit {
  private parrafo: SpeechSynthesisUtterance;
  leerElementosBoolean: boolean = false;
  columnas: String[] = [
    'Nombre',
    'Correo',
    'Sala',
    'Película',
    'Fecha',
  ];
  citas: any[] = [];
  mostrar = false;

  constructor(public accService: AccService) {
    const valores = localStorage.getItem('formData');
    if (valores) {
      this.citas = JSON.parse(valores);
      this.mostrar = true;
    } else {
    }
    this.parrafo = new SpeechSynthesisUtterance();
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.accService.leerContenido.subscribe(() => {
      this.leerElementosBoolean = true;
      console.log("Leer Elementos Boolean Componente: " + this.leerElementosBoolean);
    });

    this.accService.leerContenido2.subscribe(() => {
      this.leerElementosBoolean = false;
      console.log("Leer Elementos Boolean Componente: " + this.leerElementosBoolean);
    })

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

  leerTexto1(event: MouseEvent): void {
    if (this.leerElementosBoolean) {
      const contenido = (event.target as HTMLElement).textContent;
      if (contenido) {
        this.parrafo.text = contenido;
        speechSynthesis.speak(this.parrafo);
      }
    }
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
