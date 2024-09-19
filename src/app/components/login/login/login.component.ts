import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUsuario: FormGroup;
  showError: boolean = false;
  exito = '';
  info:any
  mensaje = '';

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseError: FirebaseErrorService
  ) {
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.exito = params['exito'] || '';
      setTimeout(() => {
        this.exito = ''
      }, 3000);
    });
  }

  login() {
    const { email, password } = this.loginUsuario.value;
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/browse']);
      })
      .catch((error) => {
        this.mensaje = this.firebaseError.errorFirebase(error.code);
        this.showError = true
        setTimeout(() => {
          this.showError = false;
        }, 3000);
      });
  }
}
