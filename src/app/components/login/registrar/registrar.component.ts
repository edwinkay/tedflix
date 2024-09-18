import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {
  registrarUsuario: FormGroup;
  showError: boolean = false;
  correo: string | null = '';
  exito = 'El usuario fue registrado con exito';
  mensaje: any = 'Todos los campos deben estar completos y ser válidos.';

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseError: FirebaseErrorService
  ) {
    this.registrarUsuario = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repetirPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.correo = params['correo'] || '';
      if (this.correo) {
        this.registrarUsuario.patchValue({
          email: this.correo,
        });
      }
    });
  }

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const confirmarPassword = control.get('repetirPassword');
    if (!password || !confirmarPassword) return null;
    return password.value === confirmarPassword.value
      ? null
      : { mismatch: true };
  };

  registrar() {
    if (this.registrarUsuario.invalid) {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 3000);
    } else {
      const { username, email, password } = this.registrarUsuario.value;
      this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          return userCredential.user?.updateProfile({
            displayName: username,
          });
        })
        .then(() => {
          this.router.navigate(['/login'], {
            queryParams: { exito: this.exito },
          });
        })
        .catch((error) => {
          this.mensaje = this.firebaseError.errorFirebase(error.code);
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
            this.mensaje =
              'Todos los campos deben estar completos y ser válidos.';
          }, 3000);
        });
    }
  }
}
