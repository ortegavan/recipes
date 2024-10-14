import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCardComponent } from './recipe-card.component';

describe('RecipeCardComponent', () => {
  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeCardComponent);
    component = fixture.componentInstance;
    component.categories = [
      { id: 1, name: 'Sobremesa', icon: 'icon-dessert' },
      { id: 2, name: 'Prato Principal', icon: 'icon-main' },
    ];
    component.recipe = {
      id: 1,
      name: 'Exemplo de Receita',
      description: 'Uma deliciosa receita de exemplo.',
      categoryIds: [1],
      imagePath: '/assets/exemplo.jpg',
      ingredients: ['Ingrediente 1', 'Ingrediente 2'],
      instructions: ['Passo 1', 'Passo 2'],
      new: true,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
