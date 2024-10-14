import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Recipe } from '../../data/recipe.model';
import { Category } from '../../data/category.model';
import { CategoryNamePipe } from '../../util/category-name.pipe';
import { NewRecipeBadgeDirective } from '../../util/new-recipe-badge.directive'; // Importando a diretiva

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CategoryNamePipe, NewRecipeBadgeDirective], // Importando a diretiva
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Input() categories!: Category[];
}
