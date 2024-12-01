import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { provideHttpClient } from '@angular/common/http';
import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { mockCategories } from './categories.mock';

describe('CategoryService', () => {
    let service: CategoryService;
    let controller: HttpTestingController;
    const apiBaseUrl = environment.apiBaseUrl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        service = TestBed.inject(CategoryService);
        controller = TestBed.inject(HttpTestingController);
    });

    it('deve retornar uma lista de categorias', (done) => {
        service.get().subscribe((categories) => {
            expect(categories).toEqual(mockCategories);
            done();
        });

        const req = controller.expectOne(`${apiBaseUrl}/api/v1/categories`);
        expect(req.request.method).toEqual('GET');
        req.flush(mockCategories);
    });
});
