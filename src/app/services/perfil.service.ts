import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  constructor() {}

  private seleccionSource = new BehaviorSubject<any>(null);
  seleccion$ = this.seleccionSource.asObservable();

  setSeleccion(data: any) {
    this.seleccionSource.next(data);
  }
}
