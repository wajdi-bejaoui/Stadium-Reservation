import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stadium-detail-screen',
  templateUrl: './stadium-detail-screen.component.html',
  styleUrl: './stadium-detail-screen.component.css'
})



export class StadiumDetailScreenComponent implements OnInit {
  selectedDay = {
    day : '',
    date :''
  };

  selectedTime = {
    start : '',
    end : ''
  };

  

  timing = [
    {
      start : '9:00',
      end : '10:15'
    },
    {
      start : '10:30',
      end : '11:45'
    },
    {
      start : '12:00',
      end : '13:15'
    },
    {
      start : '13:30',
      end : '14:45'
    },
    {
      start : '13:30',
      end : '14:45'
    },
    {
      start : '15:00',
      end : '15:15'
    },
  ]
  

  week: Array<{day: string, date: string}> = [];

  constructor() { }

  ngOnInit(): void {
    this.generateWeek();
  }

  generateWeek() {
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(today);
      currentDay.setDate(today.getDate() + i);
      
      const day = daysOfWeek[currentDay.getDay()];
      const date = currentDay.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });

      this.week.push({
        day,
        date
      });
    }
  }
}
