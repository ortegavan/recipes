import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewComponent } from './review.component';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { mockComments } from '../../data/comments.mock';
import { By } from '@angular/platform-browser';

describe('ReviewComponent', () => {
    let component: ReviewComponent;
    let fixture: ComponentFixture<ReviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RatingModule, ButtonModule],
        }).compileComponents();

        fixture = TestBed.createComponent(ReviewComponent);
        component = fixture.componentInstance;
    });

    it('deve calcular corretamente a média e preencher o mapa quando os comentários mudam', () => {
        fixture.componentRef.setInput('comments', mockComments);
        component.ngOnChanges();
        fixture.detectChanges();

        expect(component.rating).toBe(4.5);

        expect(component.map.get(5)).toBe(1);
        expect(component.map.get(4)).toBe(1);
        expect(component.map.get(3)).toBe(0);
        expect(component.map.get(2)).toBe(0);
        expect(component.map.get(1)).toBe(0);
    });

    it('deve exibir tudo zerado quando não houver comentários', () => {
        fixture.componentRef.setInput('comments', []);
        component.ngOnChanges();
        fixture.detectChanges();

        expect(component.rating).toBe(0);

        expect(component.map.get(5)).toBe(0);
        expect(component.map.get(4)).toBe(0);
        expect(component.map.get(3)).toBe(0);
        expect(component.map.get(2)).toBe(0);
        expect(component.map.get(1)).toBe(0);
    });

    it('deve verificar se a média das notas é renderizada corretamente', () => {
        fixture.componentRef.setInput('comments', mockComments);
        fixture.detectChanges();

        const el = fixture.nativeElement.querySelector('.average');
        expect(el.textContent).toBe('4.50');
    });
});
