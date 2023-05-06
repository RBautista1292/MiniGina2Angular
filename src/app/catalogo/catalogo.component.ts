import { Component, OnInit } from '@angular/core';
import { Pelicula, PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  peliculas: Pelicula[];

  constructor(public servicio: PeliculasService) {
    this.peliculas = this.servicio.getMovies();
  }
  ngOnInit(): void {
    
  }
}
