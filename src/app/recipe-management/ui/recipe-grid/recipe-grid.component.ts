import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Recipe } from '../../data/recipe.model';
import { Category } from '../../data/category.model';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipe-grid',
  standalone: true,
  imports: [RecipeCardComponent],
  templateUrl: './recipe-grid.component.html',
  styleUrl: './recipe-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeGridComponent {
  @Input() recipes!: Recipe[];
  @Input() categories!: Category[];
}
