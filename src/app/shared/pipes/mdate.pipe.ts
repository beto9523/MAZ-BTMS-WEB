import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: Date): Date {
    if (!value) return value; // Handle null or undefined values
    
    return value;
  }
}