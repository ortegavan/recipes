import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    httpClient = inject(HttpClient);
    apiBaseUrl = environment.apiBaseUrl;

    public get() {
        return this.httpClient.get(`${this.apiBaseUrl}/api/v1/recipes`);
    }
}
