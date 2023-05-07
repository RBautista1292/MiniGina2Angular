import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../servicios/peliculas.service';
import { ActivatedRoute } from '@angular/router';

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

  peliculaCompra(pelicula: Pelicula){
    this.datosPelicula = pelicula;
    this.isCatalogoVisible = false;
    this.isCompraVisible = true;
  }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.isCatalogoVisible = url[1].path === 'catalogo';
      this.isCompraVisible = url[1].path === 'compra';
    });
  }
  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe(url => {
      this.isCatalogoVisible = url[1].path === 'catalogo';
      this.isCompraVisible = url[1].path === 'compra';
    });
  }
}
