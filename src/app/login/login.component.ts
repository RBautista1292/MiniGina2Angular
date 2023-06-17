import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
import { ConfirmationResult, getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { ConfirmationResultService } from 'src/app/services/confirmation-result.service';
import { SessionService } from 'src/app/services/session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginUsuarioC: FormGroup;
  loginUsuarioT: FormGroup;
  loading: boolean = false;
  recaptchaVerifier!: RecaptchaVerifier;
  confirmationResult!: ConfirmationResult;
  adminUID = '5ONTPL5AACSW3OnubQDt1f0MUxz1';
  @ViewChild('recaptchaContainer') recaptchaContainer!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService,
    private confirmationResultService: ConfirmationResultService,
    private session: SessionService,
  ) {
    this.loginUsuarioC = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.loginUsuarioT = this.fb.group({
      numTelefono: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    const auth = getAuth();
    this.recaptchaVerifier = new RecaptchaVerifier(this.recaptchaContainer.nativeElement, {
      'size': 'normal',
      'callback': (response: any) =>{ 
        //this.onSignInSubmit();
      }
    }, auth);
    this.recaptchaVerifier.render();
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    const auth = getAuth();
    this.recaptchaVerifier = new RecaptchaVerifier(this.recaptchaContainer.nativeElement, {
      'size': 'normal',
      'callback': (response: any) =>{ 
        //this.onSignInSubmit();
      }
    }, auth);
    this.recaptchaVerifier.render();
  }

  onSignInSubmit(): void {
    const auth = getAuth();
    const appVerifier = this.recaptchaVerifier;
    const phoneNumber = "+52" + this.loginUsuarioT.value.numTelefono;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        this.confirmationResultService.setConfirmationResult(confirmationResult);
        this.router.navigate(['/verificacion']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loginC() {
    const email = this.loginUsuarioC.value.email;
    const password = this.loginUsuarioC.value.password;

    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      if(user.user?.emailVerified) {
        if(user.user?.phoneNumber) {
          this.session.setUser(user);
          if (user.user?.uid === this.adminUID) this.router.navigate(['/dashboard']);
          else this.router.navigate(['/inicio']);
        }
        else this.router.navigate(['/vincular-telefono']);
      } else {
        this.router.navigate(['/verificar-correo']);
      }
    }).catch((error) => {
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Datos erróneos, vuelva a intentarlo',
        showConfirmButton: true,
        timer: 4000,
      });
    })
  }
}
