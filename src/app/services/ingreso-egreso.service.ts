import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}

  crearIngresos(ingresoEgreso: IngresoEgreso) {
    const { uid } = this.authService.u;
    return this.firestore
      .doc(uid + '/ingresos-egresos')
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  obtenerIngresosYegresos(uid: string) {
    return this.firestore
      .collection(uid + '/ingresos-egresos/items')
      .snapshotChanges()
      .pipe(
        map((snap) => {
          return snap.map((doc) => {
            const data: {} = doc.payload.doc.data();
            return { ...data, uid: doc.payload.doc.id };
          });
        })
      );
  }

  borrarUno(uid: string) {
    console.log(this.authService.u.uid + '/ingresos-egresos/items/' + uid);
    return this.firestore
      .doc(this.authService.u.uid + '/ingresos-egresos/items/' + uid)
      .delete();
  }
}
