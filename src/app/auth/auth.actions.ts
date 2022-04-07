import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/user';

export const setUser = createAction(
  '[Auth Component] set user',
  props<{ user: Usuario }>()
);



export const unSetUser = createAction('[Auth Component] Unset user');