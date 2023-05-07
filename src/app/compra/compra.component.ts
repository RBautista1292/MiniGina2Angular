import { Component, Input } from '@angular/core';
import { Pelicula, PeliculasService } from '../servicios/peliculas.service';
import { Boleto, BoletosService } from '../servicios/boletos.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent {
  peliculas: Pelicula[];
  boletos: Boleto[];
  @Input() datosPeliculaCompra: Pelicula = {
    nombre: "",
    sinopsis: "",
    img: "",
    year: 0,
    duracion: 0,
    director: "",
    collapse: 0,
    trailer: "",
    generos: []
  };;
  
  constructor(public servicio1: PeliculasService, public servicio2: BoletosService) {
    this.peliculas = this.servicio1.getMovies();
    this.boletos = this.servicio2.getTickets();
  }
}
