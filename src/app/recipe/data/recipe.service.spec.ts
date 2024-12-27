import { TestBed } from '@angular/core/testing';
import { RecipeService } from './recipe.service';
import { provideHttpClient } from '@angular/common/http';
import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { mockRecipes } from './recipes.mock';

describe('RecipeService', () => {
    let service: RecipeService;
    let controller: HttpTestingController;
    const apiBaseUrl = environment.apiBaseUrl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        service = TestBed.inject(RecipeService);
        controller = TestBed.inject(HttpTestingController);
    });

    it('deve retornar uma lista de receitas', (done) => {
        service.get().subscribe((recipes) => {
            expect(recipes).toEqual(mockRecipes);
            done();
        });

        const req = controller.expectOne(`${apiBaseUrl}/api/v1/recipes`);
        expect(req.request.method).toEqual('GET');
        req.flush(mockRecipes);
    });

    it('deve retornar uma receita pelo id', (done) => {
        const recipe = mockRecipes[0];
        const recipeId = recipe.id;

        service.getById(recipeId).subscribe((recipeResponse) => {
            expect(recipeResponse).toEqual(recipe);
            done();
        });

        const req = controller.expectOne(
            `${apiBaseUrl}/api/v1/recipes/${recipeId}`,
        );
        expect(req.request.method).toEqual('GET');
        req.flush(recipe);
    });

    it('deve fazer uma requisição com o parâmetro de busca e retornar receitas', (done) => {
        const searchQuery = 'tomate';

        service.search(searchQuery).subscribe((recipes) => {
            expect(recipes).toEqual(mockRecipes);
            done();
        });

        const req = controller.expectOne(
            `${apiBaseUrl}/api/v1/recipes?search=${searchQuery}`,
        );
        expect(req.request.method).toBe('GET');
        expect(req.request.params.get('search')).toBe(searchQuery);
        req.flush(mockRecipes);
    });
});
