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
      {
        id: 1,
        name: 'Espaguete com Tomatinhos Cereja e Manjericão',
        description:
          'Uma receita simples e deliciosa de espaguete com tomatinhos cereja frescos e manjericão.',
        categoryIds: [1],
        imagePath:
          'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
        ingredients: [
          '200g de espaguete',
          '300g de tomatinhos cereja cortados ao meio',
          '2 dentes de alho picados',
          '3 colheres de sopa de azeite de oliva',
          '1/2 xícara de folhas de manjericão fresco',
          'Sal e pimenta a gosto',
          'Queijo parmesão ralado a gosto',
        ],
        instructions: [
          'Cozinhe o espaguete em água salgada conforme as instruções da embalagem até ficar al dente.',
          'Enquanto isso, aqueça o azeite em uma frigideira grande e refogue o alho até dourar levemente.',
          'Adicione os tomatinhos cereja e cozinhe por cerca de 5 minutos, até começarem a amolecer.',
          'Tempere com sal e pimenta a gosto.',
          'Escorra o espaguete e adicione à frigideira com os tomates.',
          'Misture bem, adicione o manjericão e mexa rapidamente.',
          'Sirva com queijo parmesão ralado por cima.',
        ],
        new: true,
      },
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
