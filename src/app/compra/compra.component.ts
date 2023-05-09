import { Component, Input, OnInit } from '@angular/core';
import { Pelicula, PeliculasService } from '../servicios/peliculas.service';
import { Boleto, BoletosService } from '../servicios/boletos.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  peliculas: Pelicula[];
  boletos: Boleto[];
  nPelicula = 0;
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
  };
  
  constructor(public servicio1: PeliculasService, public servicio2: BoletosService, private rutaActiva: ActivatedRoute) {
    this.peliculas = this.servicio1.getMovies();
    this.boletos = this.servicio2.getTickets();
  }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        if(Object.keys(params).length != 0) {
          console.log("Param:"+ typeof params['movie']);
          for(let pelicula of this.peliculas) {
            this.nPelicula = parseInt(params['movie'])
            if(pelicula.collapse === this.nPelicula) {
              this.datosPeliculaCompra = pelicula;
            }
          }
        }
      
      }
    );
  }
}
