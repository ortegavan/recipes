import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, mergeMap, Observable } from 'rxjs';
import { Recipe } from './recipe.model';
import { Favorite } from '../../social/data/favorite.model';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    httpClient = inject(HttpClient);
    apiBaseUrl = environment.apiBaseUrl;

    public get(): Observable<Recipe[]> {
        return this.httpClient
            .get<Recipe[]>(`${this.apiBaseUrl}/api/v1/recipes`)
            .pipe(map((recipes) => recipes.slice(0, 9)));
    }

    public getById(id: string): Observable<Recipe> {
        return this.httpClient.get<Recipe>(
            `${this.apiBaseUrl}/api/v1/recipes/${id}`,
        );
    }

    public getByUserId(userId: string): Observable<Recipe[]> {
        return this.httpClient.get<Recipe[]>(
            `${this.apiBaseUrl}/api/v1/recipes`,
            {
                params: {
                    userId,
                },
            },
        );
    }

    public getFavorites(userId: string): Observable<Recipe[]> {
        return this.httpClient
            .get<Favorite[]>(`${this.apiBaseUrl}/api/v1/favorites`, {
                params: { userId },
            })
            .pipe(
                map((favorites) => {
                    return favorites.map((fav) => fav.recipeId);
                }),
                mergeMap((recipeIds) => {
                    return this.httpClient.get<Recipe[]>(
                        `${this.apiBaseUrl}/api/v1/recipes`,
                        {
                            params: {
                                id: `[${recipeIds.join(',')}]`,
                            },
                        },
                    );
                }),
                catchError(() => []),
            );
    }

    public search(search: string): Observable<Recipe[]> {
        return this.httpClient.get<Recipe[]>(
            `${this.apiBaseUrl}/api/v1/recipes`,
            {
                params: {
                    search,
                },
            },
        );
    }

    public create(recipe: Recipe): Observable<Recipe> {
        return this.httpClient.post<Recipe>(
            `${this.apiBaseUrl}/api/v1/recipes`,
            recipe,
        );
    }

    public update(recipe: Recipe): Observable<Recipe> {
        return this.httpClient.put<Recipe>(
            `${this.apiBaseUrl}/api/v1/recipes/${recipe.id}`,
            recipe,
        );
    }

    public delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(
            `${this.apiBaseUrl}/api/v1/recipes/${id}`,
        );
    }
}
