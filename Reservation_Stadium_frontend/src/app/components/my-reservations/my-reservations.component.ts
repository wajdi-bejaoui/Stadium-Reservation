import { Component } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrl: './my-reservations.component.css'
})
export class MyReservationsComponent {

  selectedcategoryName: string | null = null;


  reservations: any[]=[];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.getReservation(); // Pass the user ID here
  }

  getReservation(): void {
    this.reservationService.getReservationsByUserId().subscribe(
      (response) => {
        console.log(response)
        this.reservations = response;
        console.log(this.reservations);
      },
      (error) => {
        console.error('Error fetching reservation:', error);
      }
    );
  }

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

}
