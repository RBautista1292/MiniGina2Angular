import { Component, EventEmitter, Output } from '@angular/core';
import { RutaService } from '../servicios/ruta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, private rutaService: RutaService){}
  restart() {
      this.router.navigate(['/contenido']);
  }
  
}
