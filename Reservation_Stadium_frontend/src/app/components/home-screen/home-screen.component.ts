import { Component } from '@angular/core';
import { StadiumService } from '../../services/stadium.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent {

  listStadiums !:any[];
  loading = true;

  constructor(private stadiumService : StadiumService, private router : Router) {}

  ngOnInit(): void {
    this.stadiumService.getAllStadiums().subscribe(
      (response: any) => {
        this.listStadiums = response.slice(0, 4);
        console.log(this.listStadiums)
        this.loading = false; // Stop loading once data is retrieved
      },
      (error) => {
        console.error(error);
        this.loading = false; // Stop loading even if there is an error
      }
    );
  }

  items = [1,2,3,4];

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

  navigateWithQuerysParams(category: string | null, gouvernorat: string | null): void {
    this.router.navigate(['/stadiums'], { queryParams: { category, gouvernorat } });
  }

  search() {
    this.navigateWithQuerysParams(this.selectedcategoryName,this.selectedGouvernoratsName);
  }

}
