import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingFormComponent } from './rating-form.component';

describe('RatingFormComponent', () => {
  let component: RatingFormComponent;
  let fixture: ComponentFixture<RatingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
