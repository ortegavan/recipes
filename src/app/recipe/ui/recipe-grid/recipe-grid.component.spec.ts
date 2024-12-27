import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeGridComponent } from './recipe-grid.component';
import { mockRecipes } from '../../data/recipes.mock';
import { mockCategories } from '../../data/categories.mock';

describe('RecipeGridComponent', () => {
    let component: RecipeGridComponent;
    let fixture: ComponentFixture<RecipeGridComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RecipeGridComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RecipeGridComponent);
        fixture.componentRef.setInput('recipes', mockRecipes);
        fixture.componentRef.setInput('categories', mockCategories);

        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('deve renderizar a grade de receitas', () => {
        const recipes = fixture.nativeElement.querySelector('.recipes');
        expect(recipes).toBeTruthy();

        const recipeCards =
            fixture.nativeElement.querySelectorAll('app-recipe-card');
        expect(recipeCards.length).toBe(2);
    });
});
