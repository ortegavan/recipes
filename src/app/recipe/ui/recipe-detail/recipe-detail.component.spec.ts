import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeDetailComponent } from './recipe-detail.component';
import { mockRecipes } from '../../data/recipes.mock';

describe('RecipeDetailComponent', () => {
    let component: RecipeDetailComponent;
    let fixture: ComponentFixture<RecipeDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({}).compileComponents();

        fixture = TestBed.createComponent(RecipeDetailComponent);
        fixture.componentRef.setInput('recipe', mockRecipes[0]);

        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('deve renderizar os detalhes da receita', () => {
        const name = 'Espaguete com tomatinhos cereja e manjericão';
        const img = fixture.nativeElement.querySelector('img');
        expect(img.src).toContain(
            'https://images.pexels.com/photos/11654225/pexels-photo-11654225.jpeg',
        );
        expect(img.alt).toBe(name);

        const h1 = fixture.nativeElement.querySelector('h1');
        expect(h1.textContent).toBe(name);

        const small = fixture.nativeElement.querySelector('small');
        expect(small.textContent).toBe(
            'Uma receita simples e deliciosa de espaguete com tomatinhos cereja frescos e manjericão.',
        );
    });
});
