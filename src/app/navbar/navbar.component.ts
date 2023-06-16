import { Component, EventEmitter, Output } from '@angular/core';
import { RutaService } from '../services/ruta.service';
import { Router } from '@angular/router';
import { Pelicula, PeliculasService } from '../services/peliculas.service';
import Swal from 'sweetalert2';
import { AccService } from '../shared/acc.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  nombre: string = '';
  ruta: string = '';
  peliculas: Pelicula[];
  color = '#121212';
  search = false;
  constructor(
    private router: Router,
    private rutaService: RutaService,
    private peliculasService: PeliculasService, 
    public accService: AccService
  ) {
    this.peliculas = this.peliculasService.getMovies();
  }

  enrutar(): void {
    this.nombre = this.nombre.toLowerCase();
    this.rutaService.setSharedData(this.nombre);
    for (let pelicula of this.peliculas) {
      if (this.nombre === pelicula.nombre.toLowerCase()) {
        this.search = true;
      }
    }
    if (!this.search) {
      Swal.fire({
        icon: 'error',
        title: '¡Lo sentimos!',
        text: 'La película no fue encontrada',
      });
    }
    for (let pelicula of this.peliculas) {
      if (this.nombre === pelicula.nombre.toLowerCase()) {
        this.ruta = pelicula.collapse.toString();
        this.router.navigate(['/contenido', this.ruta]);
        this.nombre = '';
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        this.search = false;
      }
    }
  }
}
