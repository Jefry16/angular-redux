import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/user';
import { setUser } from './auth.actions';

export interface State {
  usuario: Usuario;
}

export const initialState: State = {
  usuario: null,
};

const _authReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, usuario: { ...user } }))
);

export function authReducer(state, action) {
  return _authReducer(state, action);
}
