import { Component, inject } from '@angular/core';
import { RecipeService } from '../../../recipe/data/recipe.service';
import { CategoryService } from '../../../recipe/data/category.service';
import { AuthService } from '../../../auth/data/auth.service';
import { BannerComponent } from '../../../shared/ui/banner/banner.component';
import { RecipeTableComponent } from '../../../recipe/ui/recipe-table/recipe-table.component';
import { AsyncPipe } from '@angular/common';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { FavoriteService } from '../../data/favorite.service';
import { Favorite } from '../../data/favorite.model';
import { mergeMap, of } from 'rxjs';

@Component({
    selector: 'app-favorites',
    imports: [BannerComponent, RecipeTableComponent, AsyncPipe, ConfirmDialog],
    providers: [ConfirmationService],
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.css',
})
export class FavoritesComponent {
    authService = inject(AuthService);
    recipeService = inject(RecipeService);
    categoryService = inject(CategoryService);
    favoriteService = inject(FavoriteService);
    confirmationService = inject(ConfirmationService);
    router = inject(Router);

    favorites$ = this.recipeService.getFavorites(this.authService.getId());
    categories$ = this.categoryService.get();

    view(id: string) {
        this.router.navigate(['/receitas', id]);
    }

    delete(id: string) {
        this.confirmationService.confirm({
            header: 'Atenção',
            message: 'Quer remover esta receita da sua lista de favoritos?',
            rejectButtonProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Remover',
                severity: 'danger',
            },
            accept: () => {
                this.favorites$ = this.favoriteService
                    .getByUserIdAndRecipeId(this.authService.getId(), id)
                    .pipe(
                        mergeMap((favorites: Favorite[]) =>
                            this.favoriteService.delete(favorites[0].id),
                        ),
                        mergeMap(() =>
                            this.recipeService.getFavorites(
                                this.authService.getId(),
                            ),
                        ),
                    );
            },
        });
    }
}
