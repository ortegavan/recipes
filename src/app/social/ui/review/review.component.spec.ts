import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewComponent } from './review.component';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { mockComments } from '../../data/comments.mock';

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

    it('deve verificar se a média das notas é renderizada corretamente', () => {
        component.rating = 3;
        fixture.detectChanges();

        const el = fixture.nativeElement.querySelector('.average');
        expect(el.textContent).toContain('3');
    });

    it('deve calcular corretamente a média e preencher o mapa quando os comentários mudam', () => {
        component.comments = mockComments;
        component.ngOnChanges({
            comments: {
                currentValue: mockComments,
                previousValue: [],
                firstChange: true,
                isFirstChange: () => true,
            },
        });
        fixture.detectChanges();

        expect(component.rating).toBe(4);

        expect(component.map.get(5)).toBe(1);
        expect(component.map.get(4)).toBe(0);
        expect(component.map.get(3)).toBe(1);
        expect(component.map.get(2)).toBe(0);
        expect(component.map.get(1)).toBe(0);
    });

    it('deve exibir tudo zerado quando não houver comentários', () => {
        component.comments = [];
        component.ngOnChanges({
            comments: {
                currentValue: [],
                previousValue: [],
                firstChange: true,
                isFirstChange: () => true,
            },
        });
        fixture.detectChanges();

        expect(component.rating).toBe(0);

        expect(component.map.get(5)).toBe(0);
        expect(component.map.get(4)).toBe(0);
        expect(component.map.get(3)).toBe(0);
        expect(component.map.get(2)).toBe(0);
        expect(component.map.get(1)).toBe(0);
    });
});
