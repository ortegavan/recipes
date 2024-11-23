import { Component } from '@angular/core';
import { RecipesComponent } from '../recipes/recipes.component';
import { SearchComponent } from '../search/search.component';

@Component({
    selector: 'app-home',
    imports: [RecipesComponent, SearchComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {}
