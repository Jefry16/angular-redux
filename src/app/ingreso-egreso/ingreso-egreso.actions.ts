import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso';

export const setItems = createAction(
  '[Ingreso egreso Component] Set item',
  props<{ items: IngresoEgreso[] }>()
);

export const unSetItems = createAction(
  '[Ingreso egreso Component] Unset items'
);
