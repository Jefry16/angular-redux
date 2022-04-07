import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { isLoading, stopLoading } from '../shared/ui.actions';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  tipo: 'ingreso' | 'egreso' = 'ingreso';
  isLoading: boolean = false;
  loadingSubscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });

    this.loadingSubscription = this.store.select('ui').subscribe((ui) => {
      this.isLoading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  guardar() {
    this.store.dispatch(isLoading());

    const { descripcion, monto } = this.form.value;
    const { uid } = this.authService.u;
    const ie = new IngresoEgreso(descripcion, monto, this.tipo, uid);
    this.ingresoEgresoService
      .crearIngresos(ie)
      .then(() => {
        Swal.fire(
          this.tipo.charAt(0).toUpperCase() + this.tipo.slice(1),
          descripcion,
          'success'
        );
        this.form.reset();
        this.store.dispatch(stopLoading());
      })
      .catch((e) => {
        Swal.fire('Error', e, 'error');
      });
  }
}
