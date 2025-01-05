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

    it('deve retornar a lista de receitas do usuário logado', (done) => {
        service.getByUserId('123456').subscribe((recipes) => {
            expect(recipes).toEqual(mockRecipes);
            done();
        });

        const req = controller.expectOne(
            `${apiBaseUrl}/api/v1/recipes?userId=123456`,
        );
        expect(req.request.method).toEqual('GET');
        req.flush(mockRecipes);
    });

    it('deve criar uma nova receita', (done) => {
        const newRecipe = mockRecipes[0];

        service.create(newRecipe).subscribe((recipe) => {
            expect(recipe).toEqual(newRecipe);
            done();
        });

        const req = controller.expectOne(`${apiBaseUrl}/api/v1/recipes`);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(newRecipe);
        req.flush(newRecipe);
    });

    it('deve atualizar uma receita', (done) => {
        const recipe = mockRecipes[0];
        const recipeId = recipe.id;

        service.update(recipeId, recipe).subscribe((recipeResponse) => {
            expect(recipeResponse).toEqual(recipe);
            done();
        });

        const req = controller.expectOne(
            `${apiBaseUrl}/api/v1/recipes/${recipeId}`,
        );
        expect(req.request.method).toEqual('PUT');
        expect(req.request.body).toEqual(recipe);
        req.flush(recipe);
    });

    it('deve deletar uma receita', (done) => {
        const recipe = mockRecipes[0];
        const recipeId = recipe.id;

        service.delete(recipeId).subscribe(() => {
            done();
        });

        const req = controller.expectOne(
            `${apiBaseUrl}/api/v1/recipes/${recipeId}`,
        );
        expect(req.request.method).toEqual('DELETE');
        req.flush(null);
    });
});
