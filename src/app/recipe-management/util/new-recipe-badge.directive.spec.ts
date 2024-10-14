import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NewRecipeBadgeDirective } from './new-recipe-badge.directive';

// Componente mock para testar a diretiva
@Component({
  template: `<h3 [appNewRecipeBadge]="isNew">Título da Receita</h3>`,
})
class TestComponent {
  isNew = true;
}

describe('NewRecipeBadgeDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NewRecipeBadgeDirective], // Diretiva standalone
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('deve adicionar o texto "Nova!" ao final do título quando appNewRecipeBadge for true', () => {
    component.isNew = true;
    fixture.detectChanges();

    const h3Element: HTMLElement = fixture.nativeElement.querySelector('h3');
    const badgeElement = h3Element.querySelector('span.new-badge');

    expect(badgeElement).toBeTruthy(); // Verifica se o span existe
    expect(badgeElement?.textContent).toBe('Nova!'); // Verifica se o texto é "Nova!"
  });

  it('não deve adicionar o texto "Nova!" quando appNewRecipeBadge for false', () => {
    component.isNew = false;
    fixture.detectChanges();

    const h3Element: HTMLElement = fixture.nativeElement.querySelector('h3');
    const badgeElement = h3Element.querySelector('span.new-badge');

    expect(badgeElement).toBeFalsy(); // Verifica se o span não existe
  });
});
