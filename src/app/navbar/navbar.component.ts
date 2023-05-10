import { Component, EventEmitter, Output } from '@angular/core';
import { RutaService } from '../servicios/ruta.service';
import { Router } from '@angular/router';
import { Pelicula, PeliculasService } from '../servicios/peliculas.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  nombre: string = "";
  ruta: string = "";
  peliculas: Pelicula[];
  color = "#4f235f";
  constructor(private router: Router, private rutaService: RutaService, private peliculasService: PeliculasService){
    this.peliculas = this.peliculasService.getMovies();
  }
  
  enrutar(): void {
    this.nombre = this.nombre.toLowerCase();
    this.rutaService.setSharedData(this.nombre);
    for (let pelicula of this.peliculas) {
      if (this.nombre === pelicula.nombre.toLowerCase()) {
        this.ruta = pelicula.collapse.toString();
        this.router.navigate(['/contenido', this.ruta]);
        this.nombre = "";
      }
    }
  }
}
