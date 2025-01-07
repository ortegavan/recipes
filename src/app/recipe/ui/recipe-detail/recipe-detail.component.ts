import {
    ChangeDetectionStrategy,
    Component,
    input,
    output,
} from '@angular/core';
import { Recipe } from '../../data/recipe.model';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-recipe-detail',
    imports: [ButtonModule],
    templateUrl: './recipe-detail.component.html',
    styleUrl: './recipe-detail.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent {
    recipe = input<Recipe>();
    favorite = input<boolean>();
    favoriteEvent = output<string>();
    unfavoriteEvent = output<string>();
}
