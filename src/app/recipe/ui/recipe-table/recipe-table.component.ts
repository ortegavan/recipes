import { Component, input, output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Recipe } from '../../data/recipe.model';
import { Category } from '../../data/category.model';
import { CategoryNamePipe } from '../../util/category-name.pipe';

@Component({
    selector: 'app-recipe-table',
    imports: [TableModule, ButtonModule, CategoryNamePipe],
    templateUrl: './recipe-table.component.html',
    styleUrl: './recipe-table.component.css',
})
export class RecipeTableComponent {
    recipes = input.required<Recipe[]>();
    categories = input.required<Category[]>();

    viewEvent = output<string>();
    newEvent = output<void>();
    editEvent = output<string>();
    deleteEvent = output<string>();
}
