import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/user';
import { setUser, unSetUser } from './auth.actions';

export interface State {
  usuario: Usuario;
}

export const initialState: State = {
  usuario: null,
};

const _authReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, usuario: { ...user } })),
  on(unSetUser, (state) => ({ ...state, usuario: null }))
);

export function authReducer(state, action) {
  return _authReducer(state, action);
}
