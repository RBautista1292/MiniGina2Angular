import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { RutaService } from '../services/ruta.service';
import { NavigationEnd, Router } from '@angular/router';
import { Pelicula, PeliculasService } from '../services/peliculas.service';
import Swal from 'sweetalert2';
import { AccService } from '../shared/acc.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SessionService } from 'src/app/services/session.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  nombre: string = '';
  ruta: string = '';
  peliculas: Pelicula[];
  color = '#121212';
  search = false;
  dataUser!: any;
  constructor(
    private router: Router,
    private rutaService: RutaService,
    private peliculasService: PeliculasService, 
    public accService: AccService,
    private afAuth: AngularFireAuth,
    private session: SessionService
  ) {
    this.peliculas = this.peliculasService.getMovies();
  }

  ngOnInit() {
    //this.dataUser = this.session.getUser();
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.afAuth.currentUser.then((user) => {
          if(this.session.getUser()) {
            this.dataUser = user;
            console.log(user);
          }
        });
        console.log(this.dataUser);
      }
    });
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
  alternarSesion() {
    if(this.dataUser) {
      console.log("Cerrando sesion");
      this.afAuth.signOut().then(() => this.router.navigate(['/inicio']));
      this.dataUser = null;
      this.session.setUser(null);
    }
    else {
      console.log("Iniciando sesion");
      this.router.navigate(['/login']);
    }
  }
}
