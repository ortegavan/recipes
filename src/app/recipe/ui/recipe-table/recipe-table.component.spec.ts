import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeTableComponent } from './recipe-table.component';

describe('RecipeTableComponent', () => {
    let component: RecipeTableComponent;
    let fixture: ComponentFixture<RecipeTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RecipeTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RecipeTableComponent);
        fixture.componentRef.setInput('recipes', []);
        fixture.componentRef.setInput('categories', []);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
