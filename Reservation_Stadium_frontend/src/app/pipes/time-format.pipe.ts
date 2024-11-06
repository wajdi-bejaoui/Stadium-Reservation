import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    // Ensure the value is a valid time string
    const timeParts = value.split(':');
    if (timeParts.length === 3) {
      return `${timeParts[0]}:${timeParts[1]}`; // Return formatted time (HH:mm)
    }
    return value; // If it's not a valid time string, return as is
  }
}