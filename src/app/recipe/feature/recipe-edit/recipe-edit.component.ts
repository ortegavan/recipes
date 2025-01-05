import { Component, inject, input, OnInit } from '@angular/core';
import { RecipeService } from '../../data/recipe.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecipeFormComponent } from '../../ui/recipe-form/recipe-form.component';
import { first, Observable } from 'rxjs';
import { Category } from '../../data/category.model';
import { CategoryService } from '../../data/category.service';
import { AsyncPipe } from '@angular/common';
import { MessageComponent } from '../../../shared/ui/message/message.component';
import { MessageType } from '../../../shared/data/message-type.enum';
import { BannerComponent } from '../../../shared/ui/banner/banner.component';
import { Recipe } from '../../data/recipe.model';
import { AuthService } from '../../../auth/data/auth.service';

@Component({
    selector: 'app-recipe-edit',
    imports: [
        RecipeFormComponent,
        AsyncPipe,
        MessageComponent,
        BannerComponent,
    ],
    templateUrl: './recipe-edit.component.html',
    styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
    form!: FormGroup;
    categories$!: Observable<Category[]>;
    returnType = MessageType.none;
    message = '';
    messageOk = 'Dados salvos com sucesso!';
    messageError = 'Erro ao salvar os dados, tente novamente.';

    id = input<string>();
    recipeService = inject(RecipeService);
    categoryService = inject(CategoryService);
    authService = inject(AuthService);
    fb = inject(FormBuilder);

    ngOnInit(): void {
        this.configForm();
        this.loadRecipe();
        this.categories$ = this.categoryService.get();
    }

    configForm() {
        this.form = this.fb.group({
            name: [''],
            description: [''],
            categoryIds: [''],
            imagePath: [''],
            ingredients: [''],
            instructions: [''],
        });
    }

    loadRecipe() {
        const id = this.id();
        if (id) {
            this.recipeService
                .getById(id)
                .pipe(first())
                .subscribe((recipe) => {
                    this.form.patchValue({
                        name: recipe.name,
                        description: recipe.description,
                        categoryIds: recipe.categoryIds,
                        imagePath: recipe.imagePath,
                        ingredients: recipe.ingredients.join('\n'),
                        instructions: recipe.instructions.join('\n'),
                    });
                });
        }
    }

    save(form: FormGroup) {
        const id = this.id();
        const recipe = {
            name: form.value.name,
            description: form.value.description,
            categoryIds: form.value.categoryIds,
            imagePath: form.value.imagePath,
            ingredients: form.value.ingredients.split('\n'),
            instructions: form.value.instructions.split('\n'),
            userId: this.authService.getId(),
        } as Recipe;

        if (id) {
            this.recipeService.update(id, recipe).subscribe({
                next: () => {
                    this.message = this.messageOk;
                    this.returnType = MessageType.success;
                },
                error: () => {
                    this.message = this.messageError;
                    this.returnType = MessageType.error;
                },
            });
        } else {
            this.recipeService.create(recipe).subscribe({
                next: () => {
                    this.message = this.messageOk;
                    this.returnType = MessageType.success;
                },
                error: () => {
                    this.message = this.messageError;
                    this.returnType = MessageType.error;
                },
            });
        }
    }
}
