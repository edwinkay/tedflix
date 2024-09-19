import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private firestore: AngularFirestore) {}

  getMovies(): Observable<any> {
    return this.firestore
      .collection('peliculas')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }
}
