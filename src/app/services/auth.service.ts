import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setUser } from '../auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubscription: Subscription;
  constructor(
    private auth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  authUserListener() {
    this.auth.authState.subscribe((fuser) => {
      if (fuser) {
        this.userSubscription = this.fireStore
          .doc(fuser.uid + '/usuario')
          .valueChanges()
          .subscribe(({ uid, correo, nombre }) => {
            const u = new Usuario(uid, nombre, correo);
            this.store.dispatch(setUser({ user: u }));
          });
      } else {
        this.userSubscription.unsubscribe();
      }
    });
  }
  crearUsuario(c: { nombre: string; correo: string; password: string }) {
    return this.auth
      .createUserWithEmailAndPassword(c.correo, c.password)
      .then(({ user }) => {
        const newUser = new Usuario(user?.uid, c.nombre, user?.email);
        console.log(newUser);
        return this.fireStore.doc(user.uid + '/usuario').set({ ...newUser });
      });
  }

  loginUsuario(correo: string, password: string) {
    return this.auth.signInWithEmailAndPassword(correo, password);
  }

  logOut() {
    return this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(map((user) => user != null));
  }
}
