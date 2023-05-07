import { Component } from '@angular/core';
import { Pelicula } from './servicios/peliculas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MiniGina2Angular';
  datosPelicula: Pelicula = {
    nombre: "",
    sinopsis: "",
    img: "",
    year: 0,
    duracion: 0,
    director: "",
    collapse: 0,
    trailer: "", 
    generos: []
  };

  peliculaCompra(pelicula: Pelicula){
    this.datosPelicula = pelicula;
  }

  constructor() {
   }
}
