import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
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
    @Input() recipes!: Recipe[];
    @Input() categories!: Category[];
    @Output() clickEvent = new EventEmitter<string>();
}
