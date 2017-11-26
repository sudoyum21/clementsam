import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'replaceDot'})
export class ReplaceDot implements PipeTransform {
  transform(value: string): string {
    let newValue = parseFloat(value).toFixed(2).replace('.' , ",")
    return `${newValue}`;
  }
}
@Pipe({name:'fiveZeros'})
export class FiveZeros implements PipeTransform {
  transform(value: string): string {
      let newValue = value+"";
      while (newValue.length < 5) newValue = "0" + newValue;  
    return `${newValue}`;
  }

}