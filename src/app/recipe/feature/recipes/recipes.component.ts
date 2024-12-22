import { Component, inject } from '@angular/core';
import { RecipeService } from '../../data/recipe.service';
import { CategoryService } from '../../data/category.service';
import { AsyncPipe } from '@angular/common';
import { RecipeGridComponent } from '../../ui/recipe-grid/recipe-grid.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-recipes',
    imports: [AsyncPipe, RecipeGridComponent],
    templateUrl: './recipes.component.html',
    styleUrl: './recipes.component.css',
})
export class RecipesComponent {
    recipeService = inject(RecipeService);
    categoryService = inject(CategoryService);
    router = inject(Router);

    recipes$ = this.recipeService.get();
    categories$ = this.categoryService.get();

    goToRecipe(id: string) {
        this.router.navigate(['/receitas', id]);
    }
}
