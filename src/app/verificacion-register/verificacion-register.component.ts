import { Component } from '@angular/core';

@Component({
  selector: 'app-verificacion-register',
  templateUrl: './verificacion-register.component.html',
  styleUrls: ['./verificacion-register.component.css']
})
export class VerificacionRegisterComponent implements OnInit {
  OTPCode: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService,
    private confirmationResultService: ConfirmationResultService){
      this.OTPCode = this.fb.group({
        otpCode: ['', Validators.required],
      });
    }

    ngOnInit() {}

    onVerifyCode() {
      const code = this.OTPCode.value.otpCode;
      const confirmationResult = this.confirmationResultService.getConfirmationResult();
      this.loading = true;
      confirmationResult.confirm(code)
        .then((result) => {
          // User signed in successfully.
          this.afAuth.signOut();
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
        });
    }
}
