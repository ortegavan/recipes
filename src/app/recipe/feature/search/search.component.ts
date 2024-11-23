import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
    Observable,
    debounceTime,
    distinctUntilChanged,
    filter,
    switchMap,
    catchError,
} from 'rxjs';
import { Recipe } from '../../data/recipe.model';
import { RecipeService } from '../../data/recipe.service';
import { AsyncPipe } from '@angular/common';
import { BannerComponent } from '../../ui/banner/banner.component';

@Component({
    selector: 'app-search',
    imports: [AsyncPipe, BannerComponent],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
})
export class SearchComponent {
    recipeService = inject(RecipeService);
    router = inject(Router);
    searchControl = new FormControl('', { nonNullable: true });
    filteredRecipes$!: Observable<Recipe[]>;

    ngOnInit(): void {
        this.filteredRecipes$ = this.searchControl.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter((searchTerm) => searchTerm.length > 2),
            switchMap((searchTerm) =>
                this.recipeService
                    .search(searchTerm)
                    .pipe(catchError(() => [])),
            ),
        );
    }

    goToRecipe(id: string) {
        this.router.navigate(['/receitas', id]);
    }
}
