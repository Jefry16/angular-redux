import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Subscriber, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso';
import { AuthService } from 'src/app/services/auth.service';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosYEgresos: IngresoEgreso[] = [];
  ieSub: Subscription;
  constructor(
    private store: Store<AppState>,
    private ieServices: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.ieSub = this.store
      .select('ingresoEgreso')
      .subscribe(({ items }) => (this.ingresosYEgresos = items));
  }

  ngOnDestroy(): void {
    this.ieSub.unsubscribe();
  }
  borrar(uid: string) {
    console.log(uid);
    this.ieServices
      .borrarUno(uid)
      .then(() => Swal.fire('Borrado', 'Item con id: ' + uid, 'success'))
      .catch((error) =>
        Swal.fire('Error', 'Algo salio mal y no se puedo eliminar', 'error')
      );
  }
}
