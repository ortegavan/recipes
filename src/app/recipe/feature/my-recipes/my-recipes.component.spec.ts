import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyRecipesComponent } from './my-recipes.component';
import { of } from 'rxjs';
import { RecipeTableComponent } from '../../ui/recipe-table/recipe-table.component';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { mockRecipes } from '../../data/recipes.mock';
import { mockCategories } from '../../data/categories.mock';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../../../auth/data/auth.service';
import { Confirmation, ConfirmationService } from 'primeng/api';
import { CategoryService } from '../../data/category.service';
import { RecipeService } from '../../data/recipe.service';

describe('MyRecipesComponent', () => {
    let component: MyRecipesComponent;
    let fixture: ComponentFixture<MyRecipesComponent>;
    let fakeAuthService: any;
    let fakeRecipeService: any;
    let fakeCategoryService: any;

    beforeEach(async () => {
        fakeAuthService = {
            getId: jasmine.createSpy('getId').and.returnValue(of('1')),
        };

        fakeRecipeService = {
            getByUserId: jasmine
                .createSpy('getByUserId')
                .and.returnValue(of(mockRecipes)),
            delete: jasmine.createSpy('delete').and.returnValue(of(null)),
        };

        fakeCategoryService = {
            get: jasmine.createSpy('get').and.returnValue(of(mockCategories)),
        };

        await TestBed.configureTestingModule({
            imports: [RecipeTableComponent, ConfirmDialog],
            providers: [
                { provide: AuthService, useValue: fakeAuthService },
                { provide: RecipeService, useValue: fakeRecipeService },
                { provide: CategoryService, useValue: fakeCategoryService },
                provideHttpClient(),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MyRecipesComponent);
        component = fixture.componentInstance;

        component.recipes$ = of(mockRecipes);
        component.categories$ = of(mockCategories);

        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('deve redirecionar para a exibição da receita', () => {
        spyOn(component.router, 'navigate');
        component.view('1');
        expect(component.router.navigate).toHaveBeenCalledWith([
            '/receitas',
            '1',
        ]);
    });

    it('deve redirecionar para a criação da receita', () => {
        spyOn(component.router, 'navigate');
        component.add();
        expect(component.router.navigate).toHaveBeenCalledWith([
            '/edicao-de-receita',
        ]);
    });

    it('deve redirecionar para a edição da receita', () => {
        spyOn(component.router, 'navigate');
        component.edit('1');
        expect(component.router.navigate).toHaveBeenCalledWith([
            '/edicao-de-receita',
            '1',
        ]);
    });

    it('deve confirmar e executar a exclusão ao aceitar', (done) => {
        let confirmationService =
            fixture.debugElement.injector.get(ConfirmationService);
        spyOn(confirmationService, 'confirm').and.callFake(
            (confirmation: Confirmation) => {
                if (confirmation.accept) {
                    return confirmation.accept();
                }
            },
        );
        component.delete('1');
        expect(fakeRecipeService.delete).toHaveBeenCalled();
        component.recipes$.subscribe(() => {
            expect(fakeRecipeService.getByUserId).toHaveBeenCalled();
            done();
        });
    });
});
