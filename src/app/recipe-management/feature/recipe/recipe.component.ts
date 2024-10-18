import { Component, inject, Input, OnChanges } from '@angular/core';
import { RecipeService } from '../../data/recipe.service';
import { AsyncPipe } from '@angular/common';
import { RecipeDetailComponent } from '../../ui/recipe-detail/recipe-detail.component';
import { Observable } from 'rxjs';
import { Recipe } from '../../data/recipe.model';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [AsyncPipe, RecipeDetailComponent],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent implements OnChanges {
  @Input() id!: string;
  recipeService = inject(RecipeService);
  recipe$!: Observable<Recipe>;

  ngOnChanges() {
    this.recipe$ = this.recipeService.getById(this.id);
  }
}
