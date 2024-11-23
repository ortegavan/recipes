import { Component, inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../../data/recipe.model';
import { RecipeService } from '../../data/recipe.service';
import { AsyncPipe } from '@angular/common';
import { RecipeDetailComponent } from '../../ui/recipe-detail/recipe-detail.component';

@Component({
    selector: 'app-recipe',
    imports: [AsyncPipe, RecipeDetailComponent],
    templateUrl: './recipe.component.html',
    styleUrl: './recipe.component.css',
})
export class RecipeComponent implements OnInit {
    @Input() id!: string;
    recipeService = inject(RecipeService);
    recipe$!: Observable<Recipe>;

    ngOnInit() {
        this.recipe$ = this.recipeService.getById(this.id);
    }
}
