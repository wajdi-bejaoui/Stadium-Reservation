// Create a state model to represent the cached stadium data.

import { StadiumState } from "./stadium/stadium.reducer";


export interface AppState {
    stadiums: StadiumState;
  }
  
  // export const initialStadiumState: StadiumState = {
  //   stadiums: {},
  //   loading: false,
  // };
  