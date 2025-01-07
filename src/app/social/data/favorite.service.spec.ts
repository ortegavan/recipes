import { TestBed } from '@angular/core/testing';
import { FavoriteService } from './favorite.service';
import { provideHttpClient } from '@angular/common/http';
import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('FavoriteService', () => {
    let service: FavoriteService;
    let controller: HttpTestingController;
    const apiBaseUrl = environment.apiBaseUrl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        service = TestBed.inject(FavoriteService);
        controller = TestBed.inject(HttpTestingController);
    });

    it('deve adicionar um favorito', () => {
        const favorite = {
            id: '1',
            userId: '1',
            recipeId: '1',
        };

        service.add(favorite).subscribe((response) => {
            expect(response).toEqual(favorite);
        });

        const req = controller.expectOne(`${apiBaseUrl}/api/v1/favorites`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(favorite);
        req.flush(favorite);
    });

    it('deve excluir um favorito', () => {
        const favoriteId = '1';

        service.delete(favoriteId).subscribe((response) => {
            expect(response).toBeNull();
        });

        const req = controller.expectOne(
            `${apiBaseUrl}/api/v1/favorites/${favoriteId}`,
        );
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
});
