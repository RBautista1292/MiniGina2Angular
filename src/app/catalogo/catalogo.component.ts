import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pelicula, PeliculasService } from '../servicios/peliculas.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  peliculas: Pelicula[];
  @Output() datosPelicula = new EventEmitter<Pelicula>();

  constructor(public servicio: PeliculasService) {
    this.peliculas = this.servicio.getMovies();

  }
  ngOnInit(): void {
    
  }

  enviarDatos(pelicula: Pelicula){
    this.datosPelicula.emit(pelicula);
  }
}
