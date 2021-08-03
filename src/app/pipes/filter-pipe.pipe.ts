import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../models/movie';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Movie[], filterText: string): Movie[] {
    filterText = filterText?filterText.toLocaleLowerCase():"";
    return filterText?value.filter((m:Movie) => m.name.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
