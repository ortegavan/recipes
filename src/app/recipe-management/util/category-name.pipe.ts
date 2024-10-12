import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../data/category.model';

@Pipe({
  name: 'categoryName',
  standalone: true,
})
export class CategoryNamePipe implements PipeTransform {
  transform(ids: number[], categories: Category[]): string {
    return ids
      .map((id) => categories.find((category) => category.id === id)?.name)
      .filter((name) => name !== undefined)
      .join(', ');
  }
}
