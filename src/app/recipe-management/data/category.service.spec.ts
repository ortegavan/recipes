import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { provideHttpClient } from '@angular/common/http';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
