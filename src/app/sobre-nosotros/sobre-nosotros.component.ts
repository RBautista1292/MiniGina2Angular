import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.css']
})
export class SobreNosotrosComponent implements OnInit{
  ngOnInit(): void {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}
