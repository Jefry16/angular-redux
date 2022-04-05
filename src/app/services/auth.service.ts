import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) {}

  authUserListener() {
    this.auth.authState.subscribe((fuser) => console.log(fuser));
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
