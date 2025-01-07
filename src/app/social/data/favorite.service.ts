import { inject, Injectable } from '@angular/core';
import { Favorite } from './favorite.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FavoriteService {
    httpClient = inject(HttpClient);
    apiBaseUrl = environment.apiBaseUrl;

    public getByUserIdAndRecipeId(
        userId: string,
        recipeId: string,
    ): Observable<Favorite[]> {
        return this.httpClient.get<Favorite[]>(
            `${this.apiBaseUrl}/api/v1/favorites`,
            {
                params: {
                    userId,
                    recipeId,
                },
            },
        );
    }

    public add(favorite: Favorite): Observable<Favorite> {
        return this.httpClient.post<Favorite>(
            `${this.apiBaseUrl}/api/v1/favorites`,
            favorite,
        );
    }

    public delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(
            `${this.apiBaseUrl}/api/v1/favorites/${id}`,
        );
    }
}
