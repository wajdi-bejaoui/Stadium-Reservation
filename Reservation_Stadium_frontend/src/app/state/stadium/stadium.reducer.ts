// Create a reducer to handle loading and caching the stadium data.

import { createReducer, on } from '@ngrx/store';
import * as StadiumActions from './stadium.actions';

export interface StadiumState {
  stadiums: any[];
  loading: boolean;
  error: any;
}

export const initialState: StadiumState = {
  stadiums: [],
  loading: false,
  error: null,
};

export const stadiumReducer = createReducer(
  initialState,
  on(StadiumActions.loadStadiums, (state) => ({
    ...state,
    loading: true,
  })),
  on(StadiumActions.loadStadiumsSuccess, (state, { stadiums }) => {
    // console.log('Updating stadiums state with:', stadiums);  // Log the state update
    return {
      ...state,
      stadiums:stadiums,
      loading: false,
    };
  }),
  on(StadiumActions.loadStadiumsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
