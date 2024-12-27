import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeComponent } from './recipe.component';
import {
    ReactiveFormsModule,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
import { of } from 'rxjs';
import { mockRecipes } from '../../data/recipes.mock';
import { mockComments } from '../../../social/data/comments.mock';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('RecipeComponent', () => {
    let component: RecipeComponent;
    let fixture: ComponentFixture<RecipeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(RecipeComponent);
        component = fixture.componentInstance;

        spyOn(component, 'comments').and.returnValue(mockComments);

        component.recipe$ = of(mockRecipes[0]);
        component.ratingForm = new FormGroup({
            rating: new FormControl(),
            comment: new FormControl(),
        });

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

        expect(component['commentService'].add).toHaveBeenCalled();
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
