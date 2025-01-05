import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFormComponent } from './recipe-form.component';
import { FormControl, FormGroup } from '@angular/forms';

describe('RecipeFormComponent', () => {
    let component: RecipeFormComponent;
    let fixture: ComponentFixture<RecipeFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RecipeFormComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RecipeFormComponent);
        fixture.componentRef.setInput(
            'form',
            new FormGroup({
                name: new FormControl(''),
                description: new FormControl(''),
                ingredients: new FormControl(''),
                instructions: new FormControl(''),
                categoryIds: new FormControl([]),
                imagePath: new FormControl(''),
            }),
        );
        fixture.componentRef.setInput('categories', []);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
