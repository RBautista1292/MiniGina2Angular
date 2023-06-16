import { Component, OnInit } from '@angular/core';
import { AccService } from '../shared/acc.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  dataUser!: any;
  constructor(public accService: AccService, private afAuth: AngularFireAuth, public session: SessionService){}
  
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
