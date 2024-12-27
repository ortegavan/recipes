import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { mockRecipes } from '../../data/recipes.mock';
import { By } from '@angular/platform-browser';
import { Recipe } from '../../data/recipe.model';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [
                provideHttpClient(),
                { provide: Router, useValue: mockRouter },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        component.filteredRecipes$ = of(mockRecipes);
        fixture.detectChanges();
    });

    it('deve navegar para a receita correta ao receber o evento goToRecipeEvent', () => {
        const banner = fixture.debugElement.query(By.css('app-banner'));
        const recipeId = 1;

        banner.triggerEventHandler('goToRecipeEvent', recipeId);

        expect(mockRouter.navigate).toHaveBeenCalledWith([
            '/receitas',
            recipeId,
        ]);
    });

    it('deve filtrar receitas com base no searchControl', fakeAsync(() => {
        const recipe = mockRecipes[0];
        const search = 'Espaguete';
        const spy = spyOn(component['recipeService'], 'search').and.returnValue(
            of([recipe]),
        );

        component.searchControl.setValue(search);
        fixture.detectChanges();
        tick(300);

        let filteredRecipes: Recipe[] = [];
        component.filteredRecipes$.subscribe((recipes) => {
            filteredRecipes = recipes;
            expect(filteredRecipes).toEqual([recipe]);
        });

        expect(spy).toHaveBeenCalledWith(search);
    }));

    it('deve filtrar receitas apenas para termos de busca com mais de 2 caracteres', fakeAsync(() => {
        const spy = spyOn(component['recipeService'], 'search').and.returnValue(
            of(mockRecipes),
        );

        component.searchControl.setValue('Es');
        fixture.detectChanges();
        tick(300);

        let filteredRecipes: Recipe[] = [];
        component.filteredRecipes$.subscribe((recipes) => {
            filteredRecipes = recipes;
            expect(filteredRecipes).toEqual([]);
        });

        expect(spy).not.toHaveBeenCalled();
    }));

    it('deve retornar um array vazio se o recipeService.search falhar', fakeAsync(() => {
        const spy = spyOn(component['recipeService'], 'search').and.returnValue(
            throwError(() => new Error('Erro no serviço')),
        );

        component.searchControl.setValue('Espaguete');
        fixture.detectChanges();
        tick(300);

        let filteredRecipes: any[] = [];
        component.filteredRecipes$.subscribe((recipes) => {
            filteredRecipes = recipes;
            expect(filteredRecipes).toEqual([]);
        });

        expect(spy).toHaveBeenCalled();
    }));
});
