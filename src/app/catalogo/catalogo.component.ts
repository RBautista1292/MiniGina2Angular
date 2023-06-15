import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pelicula, PeliculasService } from '../servicios/peliculas.service';
import { Router } from '@angular/router';
import { AccService } from '../shared/acc.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {
  peliculas: Pelicula[];
  @Output() datosPelicula = new EventEmitter<Pelicula>();

  constructor(public servicio: PeliculasService, private router: Router, public accService: AccService) {
    this.peliculas = this.servicio.getMovies();
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  enviarDatos(pelicula: Pelicula, event: any) {
    event.preventDefault();
    this.datosPelicula.emit(pelicula);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
