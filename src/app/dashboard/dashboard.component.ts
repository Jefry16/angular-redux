import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  dataSub: Subscription;
  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('user')
      .pipe(filter((user) => user.usuario !== null))
      .subscribe((e) => {
        this.dataSub = this.ingresoEgresoService
          .obtenerIngresosYegresos(e.usuario.uid)
          .subscribe((data: any) =>
            this.store.dispatch(setItems({ items: data }))
          );
      });
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
