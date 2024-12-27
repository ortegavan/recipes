import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingFormComponent } from './rating-form.component';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { RatingModule } from 'primeng/rating';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RatingFormComponent', () => {
    let component: RatingFormComponent;
    let fixture: ComponentFixture<RatingFormComponent>;

    const review = {
        rating: 5,
        comment: 'Ótima receita!',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                DialogModule,
                RatingModule,
                ButtonModule,
                TextareaModule,
                NoopAnimationsModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(RatingFormComponent);
        fixture.componentRef.setInput(
            'form',
            new FormGroup({
                rating: new FormControl('', Validators.required),
                comment: new FormControl(''),
            }),
        );
        fixture.componentRef.setInput('visible', false);

        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('deve validar o formulário como inválido quando vazio', () => {
        expect(component.form().valid).toBeFalse();
        expect(component.rating?.valid).toBeFalse();
    });

    it('deve validar o formulário como válido quando preenchido corretamente', () => {
        component.form().patchValue(review);
        expect(component.form().valid).toBeTrue();
        expect(component.rating?.valid).toBeTrue();
        expect(component.comment?.valid).toBeTrue();
    });

    it('deve emitir o evento de salvar ao clicar no botão Avaliar', () => {
        spyOn(component.saveEvent, 'emit');

        fixture.componentRef.setInput('visible', true);
        fixture.detectChanges();

        const button = fixture.debugElement.queryAll(By.css('p-button'))[1];
        button.triggerEventHandler('onClick', null);

        expect(component.saveEvent.emit).toHaveBeenCalled();
    });
});
