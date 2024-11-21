import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from './category.model';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    httpClient = inject(HttpClient);
    apiBaseUrl = environment.apiBaseUrl;

    public get(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(
            `${this.apiBaseUrl}/api/v1/categories`,
        );
    }
}
