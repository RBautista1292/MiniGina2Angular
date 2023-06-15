import { Component, OnInit } from '@angular/core';
import { AccService } from '../shared/acc.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {

  constructor(public accService: AccService){}
  
  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  desplazar(): void {
    window.scroll({
      top: 800,
      left: 0,
      behavior: 'smooth',
    });
  }
}
