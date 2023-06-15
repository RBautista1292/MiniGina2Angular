import { Component, Input, OnInit } from '@angular/core';
import { AccService } from '../shared/acc.service';


@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.css'],
})
export class SobreNosotrosComponent implements OnInit {

  

  constructor(public accService: AccService){
    
  }

  texto: boolean = this.accService.letraGrandeBooleanServicio;
  enlaces: boolean = this.accService.linkResaltadoBooleanServicio;
  alineado: boolean = this.accService.alinearTextoBooleanServicio;

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    


  }

  



}
