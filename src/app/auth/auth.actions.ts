import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/user';

export const setUser = createAction(
  '[Auth Component] set user',
  props<{ user: Usuario }>()
);
