import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../data/category.model';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-recipe-form',
    imports: [
        ReactiveFormsModule,
        InputTextModule,
        MultiSelectModule,
        TextareaModule,
        ButtonModule,
    ],
    templateUrl: './recipe-form.component.html',
    styleUrl: './recipe-form.component.css',
})
export class RecipeFormComponent {
    form = input.required<FormGroup>();
    categories = input.required<Category[]>();
    saveEvent = output<FormGroup>();
}
