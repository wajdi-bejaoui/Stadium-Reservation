import { Component, OnInit } from '@angular/core';
import { StadiumService } from '../../services/stadium.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectLoading, selectStadiums } from '../../state/stadium/stadium.selectors';
import { loadStadiums } from '../../state/stadium/stadium.actions';

import { Store } from '@ngrx/store';
import { AppState } from '../../state/stadium.state';



@Component({
  selector: 'app-stadium-list-screen',
  templateUrl: './stadium-list-screen.component.html',
  styleUrl: './stadium-list-screen.component.css'
})
export class StadiumListScreenComponent implements OnInit{
  // listStadiums !:any[];
  // loading = true;
  listStadiums$!: Observable<any[]>;
  loading$!: Observable<boolean>;
  categoryParam: string | null = null;
  gouvernoratParam: string | null = null; 

  selectedGouvernoratsName: string | null = null;

  selectedcategoryName: string | null = null;

  constructor(private store: Store<AppState>,
    private stadiumService : StadiumService, private router : Router, private route: ActivatedRoute
  ) {
    this.listStadiums$ = this.store.select(selectStadiums);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      const category = params.get('category');
      const gouvernorat = params.get('gouvernorat');
      this.selectedGouvernoratsName=gouvernorat;
      this.selectedcategoryName =category;
      this.store.dispatch(loadStadiums({ category, gouvernorat }));
    });

    // Subscribe to the observable and log the values
    this.listStadiums$.subscribe((stadiums) => {
      console.log(stadiums); // This will log the actual data emitted by the observable
    });    
    

  }
  
  items = [1,2,3,4,5,6,7,8,9];
  
  gouvernorats = [
    { id: 1, name: 'Tunis' },
    { id: 2, name: 'Bizerte' },
    { id: 3, name: 'Ariana' },
    { id: 4, name: 'Manouba' },
    { id: 5, name: 'Sfax' },
  ];
  
  categorys = [
    { id: 1, name: 'Football' },
    { id: 2, name: 'Basketball' },
    { id: 3, name: 'Handball' },
    { id: 4, name: 'Volleyball' },
    { id: 5, name: 'Natation' },
    { id: 6, name: 'Baby swimming' },
  ];
  
  

  oncategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedcategoryName = selectElement.value;
  }
  
  onGouvernoratsChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedGouvernoratsName = selectElement.value;
  }
  
  search() {
    this.store.dispatch(loadStadiums({ category: this.selectedcategoryName, gouvernorat: this.selectedGouvernoratsName }));
  }
  
  // search() {
    //   this.stadiumService.getAllStadiums(this.selectedGouvernoratsName,this.selectedcategoryName).subscribe(
      //     (response: any) => {
        //       console.log(response);
        //       this.listStadiums = response;
        //       this.loading = false; // Stop loading once data is retrieved
        //       // console.log(this.listStadiums);
        //     },
        //     (error) => {
          //       console.error(error);
          //       this.loading = false; // Stop loading even if there is an error
          //     }
          //   );
          // }
          
          // this.stadiumService.getAllStadiums(this.selectedGouvernoratsName,this.selectedcategoryName).subscribe(
          //   (response: any) => {
          //     // console.log(response);
          //     this.listStadiums = response;
          //     this.loading = false; // Stop loading once data is retrieved
          //     // console.log(this.listStadiums);
          //   },
          //   (error) => {
          //     console.error(error);
          //     this.loading = false; // Stop loading even if there is an error
          //   }
          // );
}
