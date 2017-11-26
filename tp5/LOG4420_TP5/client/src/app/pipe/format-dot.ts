import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'replaceDot'})
export class ReplaceDot implements PipeTransform {
  transform(value: string): string {
    let newValue = parseFloat(value).toFixed(2).replace('.' , ",")
    return `${newValue}`;
  }
}