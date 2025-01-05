import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/data/auth.service';
import { RecipeService } from '../../data/recipe.service';
import { RecipeTableComponent } from '../../ui/recipe-table/recipe-table.component';
import { AsyncPipe } from '@angular/common';
import { BannerComponent } from '../../../shared/ui/banner/banner.component';
import { CategoryService } from '../../data/category.service';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { mergeMap } from 'rxjs';

@Component({
    selector: 'app-my-recipes',
    imports: [
        RecipeTableComponent,
        AsyncPipe,
        BannerComponent,
        ConfirmDialogModule,
    ],
    providers: [ConfirmationService],
    templateUrl: './my-recipes.component.html',
    styleUrl: './my-recipes.component.css',
})
export class MyRecipesComponent {
    authService = inject(AuthService);
    recipeService = inject(RecipeService);
    categoryService = inject(CategoryService);
    confirmationService = inject(ConfirmationService);
    router = inject(Router);

    recipes$ = this.recipeService.getByUserId(this.authService.getId());
    categories$ = this.categoryService.get();

    view(id: string) {
        this.router.navigate(['/receitas', id]);
    }

    add() {
        this.router.navigate(['/edicao-de-receita']);
    }

    edit(id: string) {
        this.router.navigate(['/edicao-de-receita', id]);
    }

    delete(id: string) {
        this.confirmationService.confirm({
            header: 'Atenção',
            message:
                'Confirma a exclusão da receita? Esta ação não poderá ser desfeita.',
            rejectButtonProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Excluir',
                severity: 'danger',
            },
            accept: () => {
                this.recipes$ = this.recipeService
                    .delete(id)
                    .pipe(
                        mergeMap(() =>
                            this.recipeService.getByUserId(
                                this.authService.getId(),
                            ),
                        ),
                    );
            },
        });
    }
}
