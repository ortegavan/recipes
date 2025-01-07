import {
    Component,
    input,
    OnChanges,
    output,
    SimpleChanges,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Recipe } from '../../data/recipe.model';
import { Category } from '../../data/category.model';
import { CategoryNamePipe } from '../../util/category-name.pipe';
import { TableAction } from '../../data/table-action.enum';

@Component({
    selector: 'app-recipe-table',
    imports: [TableModule, ButtonModule, CategoryNamePipe],
    templateUrl: './recipe-table.component.html',
    styleUrl: './recipe-table.component.css',
})
export class RecipeTableComponent implements OnChanges {
    recipes = input.required<Recipe[]>();
    categories = input.required<Category[]>();
    actions = input<TableAction>();

    viewEvent = output<string>();
    newEvent = output<void>();
    editEvent = output<string>();
    deleteEvent = output<string>();

    canCreate = false;
    canEdit = false;

    ngOnChanges(changes: SimpleChanges): void {
        const actions = this.actions();

        if (actions) {
            this.canCreate = (actions & TableAction.create) != 0;
            this.canEdit = (actions & TableAction.edit) != 0;
        }
    }
}
