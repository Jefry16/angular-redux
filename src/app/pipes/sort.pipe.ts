import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: IngresoEgreso[]): IngresoEgreso[] {
    return value.sort((_a, _b) => {
      if (_a.descripcion === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
