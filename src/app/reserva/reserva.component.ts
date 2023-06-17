import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SessionService } from '../services/session.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RutaService } from '../services/ruta.service';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
})
export class ReservaComponent implements OnInit {
  forma!: FormGroup;
  fecha!: Date[];
  minDate: Date = new Date();
  maxDate: Date = new Date();
  defaultDate: Date = new Date();
  dataUser!: any;
  anonUser!: boolean;
  database = getDatabase();
  reservationsRef = ref(this.database, 'reservations');

  @Input() nombrePelicula!: string;

  constructor(private router: Router, private session: SessionService, private afAuth: AngularFireAuth,
    private email: RutaService,) {
    this.forma = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      salaSel: new FormControl('', Validators.required),
      numAsientos: new FormControl('', [Validators.required, Validators.min(1), Validators.max(30)]),
      nombrePel: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    });
    this.minDate.setHours(9, 0, 0);
    this.maxDate.setHours(21, 0, 0);
    this.defaultDate.setHours(9);
    this.defaultDate.setMinutes(0);
    this.defaultDate.setSeconds(0);
    this.fecha = this.getDisabledDates(new Date());
    console.log(this.nombrePelicula);
    
  }

  ngOnInit(): void {
    this.afAuth.currentUser.then((user) => {
      if(this.session.getUser()) {
        const nombreV = this.forma.get('nombre') as FormControl;
        nombreV.clearValidators();
        nombreV.updateValueAndValidity();
        const correoV = this.forma.get('correo') as FormControl;
        correoV.clearValidators();
        correoV.updateValueAndValidity();
        this.dataUser = user;
        this.anonUser = true;
        console.log(user);
      }
      else {
        this.dataUser = null;
        this.anonUser = false;
      }
    });
    
  }

  guardarCambios(): void {
    console.log(this.forma);
    const peliGuardar = this.forma.value.nombrePel;
    this.forma.controls['date'].setValue(
      this.formatDate(this.forma.get('date')?.value)
    );
    let fechona = this.forma.get('date')?.value;
    console.log(this.forma.value);
    const citas1 = JSON.stringify(this.forma.value);
    const citas = JSON.parse(citas1);
    var citasObject: never[];
    delete citas['[[Prototype]]'];
    var registroCitas = null;
    onValue(this.reservationsRef, (snapshot) => {
      registroCitas = snapshot.val();
      console.log(registroCitas);
      for (const key in registroCitas) {
        if(registroCitas.hasOwnProperty(key)) {
          const cita = registroCitas[key];
          console.log(cita);
          if (
            cita['salaSel'] === citas['salaSel'] &&
            cita['date'] === citas['date']
          ) {
            console.log('Cita ya registrada, intente de nuevo');
            Swal.fire({
              icon: 'error',
              title:
                'Cita ya registrada. Cambie los datos de su cita e intente de nuevo',
              showConfirmButton: false,
              timer: 2500,
            });
            this.forma.reset();
            this.forma.patchValue({ nombrePel: peliGuardar });
            return;
          }
          else {
            
          }
        }
      }
      //aqui
      const newReservationRef = push(this.reservationsRef);
      set(newReservationRef, {
        nombre: this.forma.value.nombre,
        correo: this.forma.value.correo,
        salaSel: this.forma.value.salaSel,
        numAsientos: this.forma.value.numAsientos,
        nombrePel: this.forma.value.nombrePel,
        date: this.forma.value.date,
      });
      fechona = fechona.replace(/\//g, '-');
      const urapi = 
        `https://cinefactionmails.onrender.com/mailCita/${this.forma.get('correo')?.value}/${this.forma.get('nombre')?.value}/${fechona}/${this.forma.get('nombrePel')?.value}/${this.forma.get('salaSel')?.value}/${this.forma.get('numAsientos')?.value}`;
        this.email.getJSONurl(urapi).subscribe((res: any) => {
          console.log(res);
        
      });
      Swal.fire({
        icon: 'success',
        title: 'Su reservación ha sido registrada',
        showConfirmButton: false,
        timer: 2500,
      });
      this.router.navigate(['/contenido', '0']);
      this.forma.reset();
      this.forma.patchValue({ nombrePel: peliGuardar });
    });
    if (registroCitas) {
      citasObject = registroCitas;
    } else {
      citasObject = [];
    }
    console.log(registroCitas);
    console.log(citasObject);
    /*if (Array.isArray(citasObject) != null) {
      console.log('hay varios');
      for (const cita of citasObject) {
        if (
          cita['salaSel'] === citas['salaSel'] &&
          cita['date'] === citas['date']
        ) {
          console.log('Cita ya registrada, intente de nuevo');
          Swal.fire({
            icon: 'error',
            title:
              'Cita ya registrada. Cambie los datos de su cita e intente de nuevo',
            showConfirmButton: false,
            timer: 2500,
          });
          this.forma.reset();
          this.forma.patchValue({ nombrePel: peliGuardar });
          return;
        }
      }
    }*/ /* else {
      console.log('solo hay uno');
      console.log(
        citasObject['salaSel'] +
          ' ' +
          citas['salaSel'] +
          ' ' +
          citasObject['date'] +
          ' ' +
          citas['date']
      );
      console.log(
        typeof citasObject['salaSel'] +
          ' ' +
          typeof citas['salaSel'] +
          ' ' +
          typeof citasObject['date'] +
          ' ' +
          typeof citas['date']
      );
      if (
        citasObject['salaSel'] === citas['salaSel'] &&
        citasObject['date'] === citas['date']
      ) {
        console.log('Cita ya registrada, intente de nuevo');
        Swal.fire({
          icon: 'error',
          title:
            'Cita ya registrada. Cambie los datos de su cita e intente de nuevo',
          showConfirmButton: false,
          timer: 2500,
        });
        this.forma.reset();
        this.forma.patchValue({ nombrePel: peliGuardar });
        return;
      }
    }*/
    /*
    citasObject.push(citas);
    console.log(citasObject);
    localStorage.setItem('formData', JSON.stringify(citasObject));*/
  }

  disabledDates = (date: Date) => {
    const currentDate = new Date();
    const disabledDates = Array.from(
      {
        length: Math.ceil(
          (date.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
        ),
      },
      (_, index) =>
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + index
        )
    );
    return disabledDates;
  };
  getDisabledDates(date: Date): Date[] {
    return this.disabledDates(date);
  }
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
      date
    );
    return formattedDate.replace(',', '');
  }

 
}
