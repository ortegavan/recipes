import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecipesComponent } from './my-recipes.component';

describe('MyRecipesComponent', () => {
  let component: MyRecipesComponent;
  let fixture: ComponentFixture<MyRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRecipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
