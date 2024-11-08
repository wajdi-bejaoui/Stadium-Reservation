import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StadiumState } from './stadium.reducer';
import { AppState } from '../stadium.state';

export const selectStadiumState = (state: AppState) => state.stadiums;

  export const selectStadiums = createSelector(
    selectStadiumState,
    (state: StadiumState) => state.stadiums
  ); 



  export const selectLoading = createSelector(
    selectStadiumState,
  (state: StadiumState) => state.loading
); 


// // Step 1: Create a feature selector to get the 'stadiums' slice of the state
// export const selectStadiumState = createFeatureSelector<StadiumState>('stadiums');

// // Step 2: Define a selector to get the list of stadiums
// export const selectStadiums = createSelector(
//   selectStadiumState,
//   (state: StadiumState) => state.stadiums
// );

// // Step 3: Define a selector to get the loading state
// export const selectLoading = createSelector(
//   selectStadiumState,
//   (state: StadiumState) => state.loading
// );

// // Step 4: Define a selector to get any errors
// export const selectError = createSelector(
//   selectStadiumState,
//   (state: StadiumState) => state.error
// );
