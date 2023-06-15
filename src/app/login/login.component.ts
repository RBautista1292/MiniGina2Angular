import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
import { ConfirmationResult, getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { ConfirmationResultService } from 'src/app/services/confirmation-result.service';

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
  @ViewChild('recaptchaContainer') recaptchaContainer!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService,
    private confirmationResultService: ConfirmationResultService,
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
        this.onSignInSubmit();
      }
    }, auth);
  }

  ngOnInit(): void {
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
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/verificar-correo']);
      }
    }).catch((error) => {
      this.loading = false;
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    })
  }
}
