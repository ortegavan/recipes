import { Routes } from '@angular/router';
import { HomeComponent } from './recipe/feature/home/home.component';
import { authGuard } from './auth/data/auth.guard';

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
    {
        path: 'login',
        loadComponent: () =>
            import('./auth/feature/login/login.component').then(
                (c) => c.LoginComponent,
            ),
    },
    {
        path: 'minhas-receitas',
        loadComponent: () =>
            import('./recipe/feature/my-recipes/my-recipes.component').then(
                (c) => c.MyRecipesComponent,
            ),
        canActivate: [authGuard],
    },
    {
        path: 'edicao-de-receita',
        loadComponent: () =>
            import('./recipe/feature/recipe-edit/recipe-edit.component').then(
                (c) => c.RecipeEditComponent,
            ),
    },
    {
        path: 'edicao-de-receita/:id',
        loadComponent: () =>
            import('./recipe/feature/recipe-edit/recipe-edit.component').then(
                (c) => c.RecipeEditComponent,
            ),
    },
    {
        path: 'favoritos',
        loadComponent: () =>
            import('./recipe/feature/favorites/favorites.component').then(
                (c) => c.FavoritesComponent,
            ),
        canActivate: [authGuard],
    },
    {
        path: 'minha-conta',
        loadComponent: () =>
            import('./user/feature/user-account/user-account.component').then(
                (c) => c.UserAccountComponent,
            ),
        canActivate: [authGuard],
    },
    { path: '**', redirectTo: 'home' },
];
