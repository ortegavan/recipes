import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeGridComponent } from './recipe-grid.component';

describe('RecipeGridComponent', () => {
  let component: RecipeGridComponent;
  let fixture: ComponentFixture<RecipeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
