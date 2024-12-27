import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NewRecipeBadgeDirective } from './new-recipe-badge.directive';

@Component({
    standalone: true,
    imports: [NewRecipeBadgeDirective],
    template: `
        <h3 [appNewRecipeBadge]="true">Receita nova</h3>
        <h3 [appNewRecipeBadge]="false">Receita antiga</h3>
    `,
})
class HostComponent {}

describe('NewRecipeBadgeDirective', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HostComponent],
        }).compileComponents();
    });

    it('deve aplicar a diretiva duas vezes', () => {
        const fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();

        const directives = fixture.debugElement.queryAll(
            By.directive(NewRecipeBadgeDirective),
        );
        expect(directives.length).toBe(2);
    });

    it('deve adicionar o badge se appNewRecipeBadge for verdadeiro', () => {
        const fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();

        const element = fixture.debugElement.queryAll(By.css('h3'))[0];
        const badge = element.nativeElement.querySelector('.new-badge');

        expect(badge).not.toBeNull();
        expect(badge.textContent).toBe('Nova!');
    });

    it('não deve adicionar o badge se appNewRecipeBadge for falso', () => {
        const fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();

        const element = fixture.debugElement.queryAll(By.css('h3'))[1];
        const badge = element.nativeElement.querySelector('.new-badge');

        expect(badge).toBeNull();
    });
});
