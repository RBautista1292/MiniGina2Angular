import { Component, OnInit } from '@angular/core';
import { AccService } from '../shared/acc.service';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';
import { SessionService } from '../services/session.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-citas-registradas',
  templateUrl: './citas-registradas.component.html',
  styleUrls: ['./citas-registradas.component.css'],
})
export class CitasRegistradasComponent implements OnInit {
  private parrafo: SpeechSynthesisUtterance;
  leerElementosBoolean: boolean = false;
  columnas: String[] = [
    'Nombre',
    'Correo',
    'Sala',
    'Película',
    'Fecha',
  ];
  citas!: any;
  mostrar = false;
  database = getDatabase();
  reservationsRef = ref(this.database, 'reservations');
  dataUser!: any;
  userID!: any;

  constructor(public accService: AccService, private session: SessionService, private afAuth: AngularFireAuth) {
    this.citas = [];
    console.log(this.dataUser);
    this.afAuth.currentUser.then((user) => {
      if(this.session.getUser()) {
        this.dataUser = user;
        this.userID = user?.uid;
        console.log(user?.uid);
        console.log(this.userID);
      }
      else {
        this.dataUser = null;
      }
    });
    var registroCitas = null;
    onValue(this.reservationsRef, (snapshot) => {
      registroCitas = snapshot.val();
      for (const key in registroCitas) {
        if(registroCitas.hasOwnProperty(key)) {
          console.log(registroCitas[key]['uid']);
          if( registroCitas[key]['uid'] === this.userID ) {
            console.log('si');
            this.citas.push(registroCitas[key]);
          }
        }
      }
    });
    /*const valores = localStorage.getItem('formData');
    if (valores) {
      this.citas = JSON.parse(valores);
      this.mostrar = true;
    } else {
    }*/
    console.log(this.citas);
    this.parrafo = new SpeechSynthesisUtterance();
  }

  ngOnInit(): void {
    this.citas = [];
    this.afAuth.currentUser.then((user) => {
      if(this.session.getUser()) {
        this.dataUser = user;
        console.log(user);
      }
      else {
        this.dataUser = null;
      }
    });
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.accService.leerContenido.subscribe(() => {
      this.leerElementosBoolean = true;
      console.log("Leer Elementos Boolean Componente: " + this.leerElementosBoolean);
    });

    this.accService.leerContenido2.subscribe(() => {
      this.leerElementosBoolean = false;
      console.log("Leer Elementos Boolean Componente: " + this.leerElementosBoolean);
    })

    this.accService.resumirContenido.subscribe(() => {
      this.reanudarVoz();
    });

    this.accService.pausarContenido.subscribe(() => {
      this.pausarVoz();
    });

    this.accService.cancelarContenido.subscribe(() => {
      this.cancelarVoz();
    });
    this.citas = [];
    console.log(this.dataUser);
    this.afAuth.currentUser.then((user) => {
      if(this.session.getUser()) {
        this.dataUser = user;
        this.userID = user?.uid;
        console.log(user?.uid);
        console.log(this.userID);
      }
      else {
        this.dataUser = null;
      }
    });
    var registroCitas = null;
    onValue(this.reservationsRef, (snapshot) => {
      registroCitas = snapshot.val();
      for (const key in registroCitas) {
        if(registroCitas.hasOwnProperty(key)) {
          console.log(registroCitas[key]['uid']);
          if( registroCitas[key]['uid'] === this.userID ) {
            console.log('si');
            this.citas.push(registroCitas[key]);
          }
        }
      }
    });
  }

  leerTexto1(event: MouseEvent): void {
    if (this.leerElementosBoolean) {
      const contenido = (event.target as HTMLElement).textContent;
      if (contenido) {
        this.parrafo.text = contenido;
        speechSynthesis.speak(this.parrafo);
      }
    }
  }

  cancelarVoz(): any {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  }

  pausarVoz(): void {
    if ('speechSynthesis' in window) {
      speechSynthesis.pause();
    }
  }

  reanudarVoz(): void {
    if ('speechSynthesis' in window) {
      speechSynthesis.resume();
    }
  }
  
}
