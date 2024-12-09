import { Component, OnInit } from '@angular/core';
import { TimingService } from '../../services/timing.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-stadium-detail-screen',
  templateUrl: './stadium-detail-screen.component.html',
  styleUrl: './stadium-detail-screen.component.css',
  providers: [DatePipe]  // Make sure to add DatePipe to the providers
})



export class StadiumDetailScreenComponent implements OnInit {
  listTimings !:any[];
  loading = true;

  selectedDay = {
    day : '',
    date :''
  };

  selectedTime = {
    start : '',
    end : ''
  };

  stadiumId!:number;
  

  week: Array<{day: string, date: string}> = [];

  constructor(private timingService : TimingService, private route: ActivatedRoute,
    private reservationService : ReservationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.generateWeek();
     // Retrieve the id from the route parameters
     this.route.paramMap?.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.stadiumId = +id;  // This will only happen if id is not null or undefined
        console.log('stadiumId :', this.stadiumId);
      }
    });
    
  }

  getAvailbleTiming() {
    const currentYear = new Date().getFullYear();
    console.log(currentYear);
    console.log(this.selectedDay.date); // Assuming the format is "3 decembre"

    // Map French month names to their corresponding numbers
    const monthMap = {
        janvier: 0,
        février: 1,
        mars: 2,
        avril: 3,
        mai: 4,
        juin: 5,
        juillet: 6,
        août: 7,
        septembre: 8,
        octobre: 9,
        novembre: 10,
        décembre: 11
    } as const;

    // Extract the day and month from the string
    const [day, monthName] = this.selectedDay.date.split(' ') as [string, keyof typeof monthMap];

    const month = monthMap[monthName];
    let date;
    if (month !== undefined) {
        const newDate = new Date(currentYear, month, parseInt(day, 10));
        console.log(newDate);

        // Format the new date to 'YYYY-MM-DD'
        date = newDate.toISOString().split('T')[0];
        console.log(date);
    } else {
        console.error('Invalid month name:', monthName);
    }

    this.timingService.getAllAvailableTimings(this.stadiumId,date).subscribe(
      (response: any) => {
        console.log(response);
        this.listTimings = response;
        this.loading = false; // Stop loading once data is retrieved
        // console.log(this.listStadiums);
      },
      (error) => {
        console.error(error);
        this.loading = false; // Stop loading even if there is an error
      }
    );
  }

  makeReservation() {
    const currentYear = new Date().getFullYear();
    console.log(currentYear);
    console.log(this.selectedDay.date); // Assuming the format is "3 decembre"

    // Map French month names to their corresponding numbers
    const monthMap = {
        janvier: 0,
        février: 1,
        mars: 2,
        avril: 3,
        mai: 4,
        juin: 5,
        juillet: 6,
        août: 7,
        septembre: 8,
        octobre: 9,
        novembre: 10,
        décembre: 11
    } as const;

    // Extract the day and month from the string
    const [day, monthName] = this.selectedDay.date.split(' ') as [string, keyof typeof monthMap];

    const month = monthMap[monthName];
    let date;
    if (month !== undefined) {
        const newDate = new Date(currentYear, month, parseInt(day, 10));
        console.log(newDate);

        // Format the new date to 'YYYY-MM-DD'
        date = newDate.toISOString().split('T')[0];
        console.log(date);
    } else {
        console.error('Invalid month name:', monthName);
    }
    // const currentYear = new Date().getFullYear();
    //  const newDate = new Date(`${currentYear}-${this.selectedDay.date}`);
    //   const date = newDate.toISOString().split('T')[0];// Format the new date to 'YYYY-MM-DD'
    // const newDate = new Date(this.selectedDay.date); // Get the current date
    // const date = newDate.toISOString().split('T')[0]; // Format to 'YYYY-MM-DD'
    this.reservationService.makeReservation(this.stadiumId,date,this.selectedTime).subscribe(
      (response: any) => {
        console.log(response);
        this.toastr.success('Reservation successful!', 'Success');
        this.loading = false; // Stop loading once data is retrieved
        // console.log(this.listStadiums);
      },
      (error) => {
        console.error(error);
        this.toastr.error('Reservation failed. Please try again.', 'Error');
        this.loading = false; // Stop loading even if there is an error
      }
    );
  }



  // generateWeek() {
  //   const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  //   const today = new Date();
    
  //   for (let i = 0; i < 7; i++) {
  //     const currentDay = new Date(today);
  //     currentDay.setDate(today.getDate() + i);
      
  //     const day = daysOfWeek[currentDay.getDay()];
  //     const date = currentDay.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });

  //     this.week.push({
  //       day,
  //       date
  //     });
  //   }
  // }

  generateWeek() {
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const today = new Date();
    
    // Make sure the array is empty before generating the new week
    this.week = [];
  
    // Loop through the next 7 days to populate the week
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(today);
      currentDay.setDate(today.getDate() + i);  // Add 'i' to the current date to move through the week
  
      const day = daysOfWeek[currentDay.getDay()];  // Get the name of the day (e.g., 'Lundi', 'Mardi', etc.)
      const date = currentDay.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });  // Get the formatted date
  
      this.week.push({
        day,
        date
      });
    }
  }
  
}
