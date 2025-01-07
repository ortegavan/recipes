import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { provideHttpClient } from '@angular/common/http';
import { Confirmation, ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { mockRecipes } from '../../../recipe/data/recipes.mock';
import { Recipe } from '../../../recipe/data/recipe.model';

describe('FavoritesComponent', () => {
    let component: FavoritesComponent;
    let fixture: ComponentFixture<FavoritesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [],
            providers: [provideHttpClient()],
        }).compileComponents();

        fixture = TestBed.createComponent(FavoritesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve redirecionar para a exibição da receita', () => {
        spyOn(component.router, 'navigate');
        component.view('1');
        expect(component.router.navigate).toHaveBeenCalledWith([
            '/receitas',
            '1',
        ]);
    });

    it('deve confirmar e executar a exclusão ao aceitar', fakeAsync(() => {
        const mockFavorite = {
            id: '1',
            userId: '1',
            recipeId: '1',
        };
        const confirmationService =
            fixture.debugElement.injector.get(ConfirmationService);

        spyOn(confirmationService, 'confirm').and.callFake(
            (confirmation: Confirmation) => {
                if (confirmation.accept) {
                    return confirmation.accept();
                }
            },
        );
        spyOn(
            component['favoriteService'],
            'getByUserIdAndRecipeId',
        ).and.returnValue(of([mockFavorite]));
        spyOn(component['favoriteService'], 'delete').and.returnValue(of());
        spyOn(component['recipeService'], 'getFavorites').and.returnValue(
            of(mockRecipes),
        );

        component.delete('1');
        tick();
        component.favorites$.subscribe(() => {
            expect(
                component['favoriteService'].getByUserIdAndRecipeId,
            ).toHaveBeenCalledWith('1', '1');
            expect(component['favoriteService'].delete).toHaveBeenCalledWith(
                '1',
            );
            expect(
                component['recipeService'].getFavorites,
            ).toHaveBeenCalledWith('1');
        });
    }));
});
