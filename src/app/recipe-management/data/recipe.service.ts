import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model'; // Importe o model

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  httpClient = inject(HttpClient);
  apiBaseUrl = environment.apiBaseUrl;

  public get(): Observable<Recipe[]> {
    // Altere o retorno do método para Observable<Recipe[]>
    return this.httpClient.get<Recipe[]>(`${this.apiBaseUrl}/api/v1/recipes`); // Altere o retorno do método para Recipe[]
  }
}
