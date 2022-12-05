import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutWords',
})
export class CutWordsPipe implements PipeTransform {
  transform(value: string, numberChar: number): unknown {
    if (value.length > numberChar) {
      value = value.slice(0, numberChar - 1) + '...';
    }
    return value;
  }
}
