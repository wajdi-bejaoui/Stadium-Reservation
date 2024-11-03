import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{

  @Input() stadium: any;  // Receive the stadium data as input

  constructor() {}
  ngOnInit(): void {
    // console.log(this.stadium)
  }

}
