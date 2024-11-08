import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StadiumService } from '../../services/stadium.service';
import * as StadiumActions from './stadium.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class StadiumEffects {
  loadStadiums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StadiumActions.loadStadiums),
      mergeMap((action) => {
        console.log('Effect triggered with action:', action);  // Log the action
        return this.stadiumService.getAllStadiums(action.gouvernorat, action.category).pipe(
          map((stadiums) => {
            console.log('Stadiums fetched:', stadiums);  // Log the fetched data
            return StadiumActions.loadStadiumsSuccess({ stadiums:stadiums });
          }),
          catchError((error) => {
            console.error('Error fetching stadiums:', error);  // Log any errors
            return of(StadiumActions.loadStadiumsFailure({ error }));
          })
        );
      })
    )
  );


  // loadStadiumss$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(StadiumActions.loadStadiums),
  //     switchMap((action) => {
  //       console.log('LoadStadiums action dispatched with:', action);  // Log the action
  //       return this.stadiumService.getAllStadiums(action.gouvernorat, action.category).pipe(
  //         map((stadiums: any[]) => {
  //           console.log('Stadiums fetched:', stadiums);  // Log the fetched stadiums data
  //           return StadiumActions.loadStadiumsSuccess({ stadiums });
  //         }),
  //         catchError((error) => {
  //           console.error('Error fetching stadiums:', error);  // Log any errors
  //           return of(StadiumActions.loadStadiumsFailure({ error }));
  //         })
  //       );
  //     })
  //   )
  // );
  

  constructor(private actions$: Actions, private stadiumService: StadiumService) {}
}
