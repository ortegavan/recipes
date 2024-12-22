import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    httpClient = inject(HttpClient);
    apiBaseUrl = environment.apiBaseUrl;

    public get(): Observable<Recipe[]> {
        return this.httpClient.get<Recipe[]>(
            `${this.apiBaseUrl}/api/v1/recipes`,
        );
    }

    public getById(id: string): Observable<Recipe> {
        return this.httpClient.get<Recipe>(
            `${this.apiBaseUrl}/api/v1/recipes/${id}`,
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
}
