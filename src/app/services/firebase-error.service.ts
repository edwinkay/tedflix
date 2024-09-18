import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirebaseErrorService {
  constructor() {}

  errorFirebase(code: string): string {
    switch (code) {
      //login
      case 'auth/user-not-found':
        return 'Usuario no encontrado';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/invalid-email':
        return 'El correo no es valido o llena todos los campos';
      case 'auth/invalid-login-credentials':
      case 'auth/invalid-credential':
        return 'Credenciales de inicio de sesión inválidas';
      case 'auth/missing-password':
        return 'Contraseña faltante';

      //registarse
      case 'auth/email-already-in-use':
        return 'Usuario ya registrado';
      case 'auth/weak-password':
        return 'Contraseña débil';
      case 'auth/internal-error':
        return 'Error interno';

      //recuperar
      case 'auth/missing-email':
        return 'Correo invalido/vacio o no registrado';

      default:
        return 'Error desconocido';
    }
  }
}
