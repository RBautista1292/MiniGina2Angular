import { Component, Input, OnInit } from '@angular/core';
import { AccService } from '../shared/acc.service';


@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.css'],
})
export class SobreNosotrosComponent implements OnInit {

  letraGrandeBoolean!: boolean;


  constructor(private accService: AccService){
    
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    this.letraGrandeBoolean = this.accService.getletraGrandeBooleanServicio();
    console.log("Booleano componente" + this.letraGrandeBoolean);
    console.log("Booleano servicio" + this.accService.letraGrandeBooleanServicio);
    console.log("Get boolean servicio" + this.accService.getletraGrandeBooleanServicio());


  }

  



}
