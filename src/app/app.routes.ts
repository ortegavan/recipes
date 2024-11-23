import { Routes } from '@angular/router';
import { HomeComponent } from './recipe/feature/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: 'receitas/:id',
        loadComponent: () =>
            import('./recipe/feature/recipe/recipe.component').then(
                (c) => c.RecipeComponent,
            ),
    },
    { path: '**', redirectTo: 'home' },
];
