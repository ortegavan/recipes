import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerComponent } from './banner.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { mockRecipes } from '../../data/recipes.mock';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';

describe('BannerComponent', () => {
    let component: BannerComponent;
    let fixture: ComponentFixture<BannerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [
                {
                    provide: ElementRef,
                    useValue: {
                        nativeElement: {
                            contains: (target: any) => false, // Mock para simular clique fora
                        },
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BannerComponent);
        component = fixture.componentInstance;
        component.recipes = mockRecipes;
        component.searchControl = new FormControl('');
        fixture.detectChanges();
    });

    it('deve exibir todos os links para as receitas recebidas no input()', () => {
        const recipeLinks = fixture.debugElement.queryAll(
            By.css('.search-result a'),
        );
        expect(recipeLinks.length).toBe(2);
        expect(recipeLinks[0].nativeElement.textContent).toContain('Espaguete');
        expect(recipeLinks[1].nativeElement.textContent).toContain('Toast');
    });

    it('deve emitir o evento de navegação ao clicar em uma receita', () => {
        spyOn(component.goToRecipeEvent, 'emit');

        const firstRecipeLink = fixture.debugElement.query(
            By.css('.search-result a'),
        );
        firstRecipeLink.triggerEventHandler('click', null);

        expect(component.goToRecipeEvent.emit).toHaveBeenCalledWith('1');
    });

    it('deve limpar a lista de receitas ao clicar fora do componente', () => {
        // Simula o evento de clique
        const event = new MouseEvent('click');
        document.dispatchEvent(event);

        // Verifica se as receitas foram limpas
        expect(component.recipes).toBeNull();
    });
});
