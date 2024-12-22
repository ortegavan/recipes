import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Category } from '../../data/category.model';
import { Recipe } from '../../data/recipe.model';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
    selector: 'app-recipe-grid',
    imports: [RecipeCardComponent],
    templateUrl: './recipe-grid.component.html',
    styleUrl: './recipe-grid.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeGridComponent {
    recipes = input<Recipe[]>();
    categories = input<Category[]>();
}
