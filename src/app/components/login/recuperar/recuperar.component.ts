import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss'],
})
export class RecuperarComponent implements OnInit {
  recuperarUsuario: FormGroup;
  exito = 'Exito, Revisa tu correo electronico';
  mensaje = '';
  showError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private firebaseError: FirebaseErrorService
  ) {
    this.recuperarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  recuperar() {
    const email = this.recuperarUsuario.value.email;

    this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.router.navigate(['/login'], {
          queryParams: { exito: this.exito },
        });
      })
      .catch((error) => {
        console.log(error)
        this.mensaje = this.firebaseError.errorFirebase(error.code);
        this.showError = true
        setTimeout(() => {
          this.showError = false;
          this.mensaje =
            '';
        }, 3000);
      });
  }

}
