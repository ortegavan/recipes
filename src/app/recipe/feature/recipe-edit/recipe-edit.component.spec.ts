import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeEditComponent } from './recipe-edit.component';
import { of, throwError } from 'rxjs';
import { mockRecipes } from '../../data/recipes.mock';
import { mockCategories } from '../../data/categories.mock';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../../data/recipe.service';
import { CategoryService } from '../../data/category.service';
import { AuthService } from '../../../auth/data/auth.service';
import { MessageType } from '../../../shared/data/message-type.enum';

describe('RecipeEditComponent', () => {
    let component: RecipeEditComponent;
    let fixture: ComponentFixture<RecipeEditComponent>;
    let fakeRecipeService: any;
    let fakeCategoryService: any;
    let fakeAuthService: any;

    beforeEach(async () => {
        fakeRecipeService = {
            getById: jasmine
                .createSpy('getById')
                .and.returnValue(of(mockRecipes[0])),
            create: jasmine
                .createSpy('create')
                .and.returnValue(of(mockRecipes[0])),
            update: jasmine
                .createSpy('update')
                .and.returnValue(of(mockRecipes[0])),
        };

        fakeCategoryService = {
            get: jasmine.createSpy('get').and.returnValue(of(mockCategories)),
        };

        fakeAuthService = {
            getId: jasmine.createSpy('getId').and.returnValue(of('1')),
        };

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [
                { provide: RecipeService, useValue: fakeRecipeService },
                { provide: CategoryService, useValue: fakeCategoryService },
                { provide: AuthService, useValue: fakeAuthService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(RecipeEditComponent);
        component = fixture.componentInstance;

        const fb = TestBed.inject(FormBuilder);
        component.form = fb.group({
            name: [''],
            description: [''],
            categoryIds: [''],
            imagePath: [''],
            instructions: [''],
            ingredients: [''],
        });

        fixture.detectChanges();
    });

    it('deve buscar uma receita pelo id e preencher o formulário', () => {
        fixture.componentRef.setInput('id', '1');
        component.loadRecipe();

        expect(fakeRecipeService.getById).toHaveBeenCalled();
        expect(component.form.value.name).toEqual(mockRecipes[0].name);
    });

    it('deve criar uma receita', () => {
        component.form.patchValue({
            name: 'Teste',
            description: 'Teste',
            categoryIds: ['1'],
            imagePath: 'https://teste.com',
            ingredients: 'Teste',
            instructions: 'Teste',
        });

        component.save(component.form);
        expect(fakeRecipeService.create).toHaveBeenCalled();
    });

    it('deve atualizar uma receita', () => {
        fixture.componentRef.setInput('id', '1');

        component.form.patchValue({
            name: 'Teste',
            description: 'Teste',
            categoryIds: ['1'],
            imagePath: 'https://teste.com',
            ingredients: 'Teste',
            instructions: 'Teste',
        });

        component.save(component.form);
        expect(fakeRecipeService.update).toHaveBeenCalled();
    });

    it('deve exibir a mensagem de erro se der erro na criação', () => {
        fakeRecipeService.create.and.returnValue(
            throwError(() => new Error('Erro ao criar receita')),
        );

        component.form.patchValue({
            name: 'Teste',
            description: 'Teste',
            categoryIds: ['1'],
            imagePath: 'https://teste.com',
            ingredients: 'Teste',
            instructions: 'Teste',
        });

        component.save(component.form);
        expect(fakeRecipeService.create).toHaveBeenCalled();

        expect(component.returnType).toBe(MessageType.error);
        expect(component.message).toBe(
            'Erro ao salvar os dados, tente novamente.',
        );
    });

    it('deve exibir a mensagem de erro se der erro na atualização', () => {
        fixture.componentRef.setInput('id', '1');

        fakeRecipeService.update.and.returnValue(
            throwError(() => new Error('Erro ao criar receita')),
        );

        component.form.patchValue({
            name: 'Teste',
            description: 'Teste',
            categoryIds: ['1'],
            imagePath: 'https://teste.com',
            ingredients: 'Teste',
            instructions: 'Teste',
        });

        component.save(component.form);
        expect(fakeRecipeService.update).toHaveBeenCalled();

        expect(component.returnType).toBe(MessageType.error);
        expect(component.message).toBe(
            'Erro ao salvar os dados, tente novamente.',
        );
    });
});
