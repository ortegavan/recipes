import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipesComponent } from './recipes.component';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { mockCategories } from '../../data/categories.mock';
import { of } from 'rxjs';
import { mockRecipes } from '../../data/recipes.mock';
import { By } from '@angular/platform-browser';

describe('RecipesComponent', () => {
    let component: RecipesComponent;
    let fixture: ComponentFixture<RecipesComponent>;
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                { provide: Router, useValue: mockRouter },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(RecipesComponent);
        component = fixture.componentInstance;
        component.categories$ = of(mockCategories);
        component.recipes$ = of(mockRecipes);
        fixture.detectChanges();
    });

    it('deve passar receitas e categorias para o componente app-recipe-grid', () => {
        const recipeGrid = fixture.debugElement.query(
            By.css('app-recipe-grid'),
        );

        const recipesInput = recipeGrid.componentInstance.recipes();
        const categoriesInput = recipeGrid.componentInstance.categories();

        expect(recipesInput).toEqual(mockRecipes);
        expect(categoriesInput).toEqual(mockCategories);
    });

    it('deve lidar com observables vazios', () => {
        component.recipes$ = of([]);
        component.categories$ = of([]);
        fixture.detectChanges();

        const recipeGrid = fixture.debugElement.query(
            By.css('app-recipe-grid'),
        );
        const recipesInput = recipeGrid.componentInstance.recipes();
        const categoriesInput = recipeGrid.componentInstance.categories();

        expect(recipesInput).toEqual([]);
        expect(categoriesInput).toEqual([]);
    });

    it('deve navegar para a receita correta ao receber o evento clickEvent', () => {
        const recipeGrid = fixture.debugElement.query(
            By.css('app-recipe-grid'),
        );
        const recipeId = 1;

        recipeGrid.triggerEventHandler('clickEvent', recipeId);

        expect(mockRouter.navigate).toHaveBeenCalledWith([
            '/receitas',
            recipeId,
        ]);
    });
});
