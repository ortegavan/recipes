import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { mockUser } from './user.mock';

describe('UserService', () => {
    let service: UserService;
    let controller: HttpTestingController;

    const apiBaseUrl = environment.apiBaseUrl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        service = TestBed.inject(UserService);
        controller = TestBed.inject(HttpTestingController);
    });

    it('deve buscar o usuário pelo id', (done) => {
        service.getById('1').subscribe((user) => {
            expect(user.id).toBe('1');
            done();
        });

        const req = controller.expectOne(`${apiBaseUrl}/api/v1/users/1`);
        expect(req.request.method).toBe('GET');
        req.flush(mockUser);
    });

    it('deve atualizar o usuário', (done) => {
        service.update(mockUser).subscribe((user) => {
            expect(user.id).toBe('1');
            done();
        });

        const req = controller.expectOne(`${apiBaseUrl}/api/v1/users/1`);
        expect(req.request.method).toBe('PUT');
        req.flush(mockUser);
    });
});
