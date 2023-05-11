import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-citas-registradas',
  templateUrl: './citas-registradas.component.html',
  styleUrls: ['./citas-registradas.component.css']
})
export class CitasRegistradasComponent implements OnInit {
  ngOnInit(): void {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}
