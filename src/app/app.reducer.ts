import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducers';
import * as user from './auth/auth.reducers';
import * as ingresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
  ui: ui.State;
  user: user.State;
  ingresoEgreso: ingresoEgreso.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: user.authReducer,
  ingresoEgreso: ingresoEgreso.ingresoEgresoReducer,
};
