import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Recipe } from '../../data/recipe.model';
import { Category } from '../../data/category.model';
import { CategoryNamePipe } from '../../util/category-name.pipe';
import { NewRecipeBadgeDirective } from '../../util/new-recipe-badge.directive';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CategoryNamePipe, NewRecipeBadgeDirective],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Input() categories!: Category[];
  @Output() clickEvent = new EventEmitter<string>();
}
