import { Component } from '@angular/core';
import { RutaService } from '../servicios/ruta.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private rutaService: RutaService){}
  
  seleccionar(opcion: string) {
    this.rutaService.notifyNavItemSelected(opcion);
  }
}
