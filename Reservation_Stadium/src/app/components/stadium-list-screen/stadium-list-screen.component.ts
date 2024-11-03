import { Component, OnInit } from '@angular/core';
import { StadiumService } from '../../services/stadium.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stadium-list-screen',
  templateUrl: './stadium-list-screen.component.html',
  styleUrl: './stadium-list-screen.component.css'
})
export class StadiumListScreenComponent implements OnInit{

  listStadiums !:any[];
  loading = true;
  categoryParam: string | null = null;
  gouvernoratParam: string | null = null; 

  constructor(private stadiumService : StadiumService, private router : Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.route.queryParamMap.subscribe(params => {
      this.categoryParam = params.get('category');
      this.gouvernoratParam = params.get('gouvernorat');
    });

    console.log(this.categoryParam)
    console.log(this.gouvernoratParam)

    this.stadiumService.getAllStadiums(this.gouvernoratParam,this.categoryParam).subscribe(
      (response: any) => {
        // console.log(response);
        this.listStadiums = response;
        this.loading = false; // Stop loading once data is retrieved
        // console.log(this.listStadiums);
      },
      (error) => {
        console.error(error);
        this.loading = false; // Stop loading even if there is an error
      }
    );
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

  selectedGouvernoratsName: string | null = null;

  selectedcategoryName: string | null = null;

  oncategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedcategoryName = selectElement.value;
  }

  onGouvernoratsChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedGouvernoratsName = selectElement.value;
  }

  search() {
    this.stadiumService.getAllStadiums(this.selectedGouvernoratsName,this.selectedcategoryName).subscribe(
      (response: any) => {
        console.log(response);
        // this.listStadiums = response;
        this.loading = false; // Stop loading once data is retrieved
        // console.log(this.listStadiums);
      },
      (error) => {
        console.error(error);
        this.loading = false; // Stop loading even if there is an error
      }
    );
  }

}
