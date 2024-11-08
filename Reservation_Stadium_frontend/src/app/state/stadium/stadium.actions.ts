import { createAction, props } from '@ngrx/store';

export const loadStadiums = createAction(
  '[Stadiums] Load Stadiums',
  props<{ category: string | null; gouvernorat: string | null }>()
);

export const loadStadiumsSuccess = createAction(
  '[Stadiums] Load Stadiums Success',
  props<{ stadiums: any[] }>()
);

export const loadStadiumsFailure = createAction(
  '[Stadiums] Load Stadiums Failure',
  props<{ error: any }>()
);
