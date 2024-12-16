import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeComponent } from './recipe.component';
import { provideHttpClient } from '@angular/common/http';
import { mockComments } from '../../../social/data/comments.mock';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';

describe('RecipeComponent', () => {
    let component: RecipeComponent;
    let fixture: ComponentFixture<RecipeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [provideHttpClient()],
        }).compileComponents();

        fixture = TestBed.createComponent(RecipeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve abrir o formulário de avaliação ao chamar openRatingForm', () => {
        component.openRatingForm();
        expect(component.showRatingForm()).toBeTrue();
    });

    it('deve fechar o formulário de avaliação ao chamar closeRatingForm', () => {
        component.closeRatingForm();
        expect(component.showRatingForm()).toBeFalse();
    });

    it('deve adicionar um comentário válido', () => {
        const form = new FormGroup({
            rating: new FormControl(5),
            comment: new FormControl('Ótima receita!'),
        });

        spyOn(component['commentService'], 'add').and.returnValue(
            of(mockComments[0]),
        );
        spyOn(component, 'closeRatingForm');

        component.addComment(form);

        expect(component['commentService'].add).toHaveBeenCalledWith(
            jasmine.objectContaining({
                recipeId: component.id,
                userId: '123456',
                userName: 'Anônimo',
                rating: 5,
                comment: 'Ótima receita!',
            }),
        );

        expect(component.closeRatingForm).toHaveBeenCalled();
    });

    it('deve marcar todos os campos como tocados e não adicionar comentário se o formulário for inválido', () => {
        const form = component.fb.group({
            rating: ['', Validators.required],
            comment: ['', Validators.required],
        });

        const spy = spyOn(component['commentService'], 'add').and.returnValue(
            of(mockComments[0]),
        );
        spyOn(form, 'markAllAsTouched');

        component.addComment(form);

        expect(form.markAllAsTouched).toHaveBeenCalled();
        expect(spy).not.toHaveBeenCalled();
    });
});
