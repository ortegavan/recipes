import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCardComponent } from './recipe-card.component';
import { mockRecipes } from '../../data/recipes.mock';
import { mockCategories } from '../../data/categories.mock';
import { By } from '@angular/platform-browser';

describe('RecipeCardComponent', () => {
    let component: RecipeCardComponent;
    let fixture: ComponentFixture<RecipeCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RecipeCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RecipeCardComponent);
        fixture.componentRef.setInput('recipe', mockRecipes[0]);
        fixture.componentRef.setInput('categories', mockCategories);

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

        const h3 = fixture.nativeElement.querySelector('h3');
        expect(h3.textContent).toBe(name);

        const p = fixture.nativeElement.querySelector('p');
        expect(p.textContent).toBe(
            'Uma receita simples e deliciosa de espaguete com tomatinhos cereja frescos e manjericão.',
        );
    });

    it('deve emitir o evento de clique ao clicar no card', () => {
        spyOn(component.clickEvent, 'emit');

        const section = fixture.debugElement.query(By.css('section.recipe'));
        section.triggerEventHandler('click', null);

        expect(component.clickEvent.emit).toHaveBeenCalledWith('1');
    });
});
