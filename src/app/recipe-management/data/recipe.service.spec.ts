import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
  let service: RecipeService;
  let httpTestingController: HttpTestingController;
  const apiBaseUrl = environment.apiBaseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), // Precisamos disponibilizar o HttpClient como faríamos normalmente
        provideHttpClientTesting(), // Sobreescreve algumas funcionalidades do HttpClient para que possamos fazer testes
        RecipeService,
      ],
    });
    service = TestBed.inject(RecipeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica se todas as requisições foram atendidas
    httpTestingController.verify();
  });

  it('deve retornar uma lista de receitas (GET)', () => {
    const mockRecipes = [
      { id: 1, name: 'Torta de Maçã' },
      { id: 2, name: 'Bolo de Cenoura' },
    ];

    // Chama o método do serviço que faz a requisição
    service.get().subscribe((recipes) => {
      // Verifica se os dados retornados são iguais aos esperados
      expect(recipes).toEqual(mockRecipes);
    });

    // Configura o controlador para esperar uma requisição GET
    const req = httpTestingController.expectOne(`${apiBaseUrl}/api/v1/recipes`);

    // Verifica se o método de requisição foi 'GET'
    expect(req.request.method).toEqual('GET');

    // Simula a resposta da API com os dados mockados
    req.flush(mockRecipes);
  });

  it('deve tratar um erro 404 ao buscar as receitas', () => {
    const errorMessage = 'Not Found';

    service.get().subscribe({
      next: () => fail('O teste deve falhar em caso de erro'),
      error: (error) => {
        // Verifica se a mensagem de erro está correta
        expect(error.status).toEqual(404);
        expect(error.statusText).toEqual(errorMessage);
      },
    });

    const req = httpTestingController.expectOne(`${apiBaseUrl}/api/v1/recipes`);

    // Simula uma resposta de erro da API
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
