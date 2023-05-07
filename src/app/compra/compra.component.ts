import { Component } from '@angular/core';
import { Pelicula, PeliculasService } from '../peliculas.service';
import { Boleto, BoletosService } from '../boletos.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent {
  peliculas: Pelicula[];
  boletos: Boleto[];
  
  constructor(public servicio1: PeliculasService, public servicio2: BoletosService) {
    this.peliculas = this.servicio1.getMovies();
    this.boletos = this.servicio2.getTickets();
  }
}
