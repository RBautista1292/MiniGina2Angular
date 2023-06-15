import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
import { updateProfile, ConfirmationResult, getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { ConfirmationResultService } from 'src/app/services/confirmation-result.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
})
export class RegistrarUsuarioComponent implements OnInit, AfterViewInit {
  registrarUsuario: FormGroup;
  loading: boolean = false;
  recaptchaVerifier!: RecaptchaVerifier;
  confirmationResult!: ConfirmationResult;
  @ViewChild('recaptchaContainer') recaptchaContainer!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService,
    private confirmationResultService: ConfirmationResultService,
  ) {
    this.registrarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', Validators.required],
      name: ['', Validators.required],
      numberTel: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    const auth = getAuth();
    this.recaptchaVerifier = new RecaptchaVerifier(this.recaptchaContainer.nativeElement, {
      'size': 'normal',
      'callback': (response: any) =>{ 
        this.registrar();
      }
    }, auth);
  }

  ngOnInit(): void {}

  registrar() {
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassowrd = this.registrarUsuario.value.repetirPassword;
    const name = this.registrarUsuario.value.name;
    const tel = this.registrarUsuario.value.numberTel;

    console.log(this.registrarUsuario);
    if (password !== repetirPassowrd) {
      this.toastr.error(
        'Las contraseñas ingresadas deben ser las mismas',
        'Error'
      );
      return;
    }

    this.loading = true;
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const displayName = name;
        if (user) {
          console.log("Usuario creado");
          updateProfile(user, { displayName })
            .then(() => {
              const auth = getAuth();
              const appVerifier = this.recaptchaVerifier;
              const phoneNumber = "+52" + this.registrarUsuario.value.numberTel;
              console.log("Verificando creacion");
          
              signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                  console.log("Telefono creado");
                  this.confirmationResult = confirmationResult;
                  this.confirmationResultService.setConfirmationResult(confirmationResult);
                  this.router.navigate(['/verificacion-register']);
                })
              .catch((error) => {
                this.loading = false;
                this.toastr.error(this.firebaseError.codeError(error.code), 'Error al crear el perfil');
              })
            })
            .catch((error) => {
              this.loading = false;
              this.toastr.error(this.firebaseError.codeError(error.code), 'Error al actualizar el perfil');
            });
        } else {
          this.loading = false;
          console.error('El usuario es nulo');
        }
      })
      .catch((error) => {
        this.loading = false;
        this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
      });
  }

  verificarCorreo() {
    this.afAuth.currentUser
      .then((user) => user?.sendEmailVerification())
      .then(() => {
        this.toastr.info(
          'Le enviamos un correo electronico para su verificacion',
          'Verificar correo'
        );
        this.router.navigate(['/login']);
      });
  }
}
