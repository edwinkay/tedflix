import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: AngularFirestore) {}

  getUsers(): Observable<any> {
    return this.firestore
      .collection('users')
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

  getUserById(userId: string): Observable<any> {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }

  addUserInfo(user: any) {
    return this.firestore.collection('users').add(user);
  }

  updateUser(user: any, userId: string) {
    return this.firestore.collection('users').doc(userId).update(user);
  }

  deleteUser(id: string): Promise<any> {
    return this.firestore.collection('users').doc(id).delete();
  }
}
