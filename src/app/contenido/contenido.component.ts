import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../servicios/peliculas.service';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { RutaService } from '../servicios/ruta.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {
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
  isCatalogoVisible = true;
  isCompraVisible = false;
  reseteaContenido = false;

  peliculaCompra(pelicula: Pelicula){
    this.datosPelicula = pelicula;
    this.isCatalogoVisible = false;
    this.isCompraVisible = true;
  }

  ngOnInit(): void {
    this.isCatalogoVisible = true;
    this.isCompraVisible = false;
  }

  regresar() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    this.isCatalogoVisible = true;
    this.isCompraVisible = false;
  }

 
  constructor(private router: Router,) {
    
  }
}
