import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../data/category.model';

@Pipe({
    name: 'categoryName',
})
export class CategoryNamePipe implements PipeTransform {
    transform(ids: string[], categories: Category[] | undefined): string {
        if (!categories) return '';

        return ids
            .map(
                (id) => categories.find((category) => category.id === id)?.name,
            )
            .filter((name) => name !== undefined)
            .join(', ');
    }
}
