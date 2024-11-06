import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review-rating',
  templateUrl: './review-rating.component.html',
  styleUrls: ['./review-rating.component.css']
})
export class ReviewRatingComponent {
  @Input() rating: number = 0;

  // Generate an array for the stars
  get stars() {
    return Array(5).fill(0).map((_, index) => index < this.rating);
  }
}
