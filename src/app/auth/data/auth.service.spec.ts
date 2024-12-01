import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { mockSession } from './session.mock';

describe('AuthService', () => {
    let service: AuthService;
    let controller: HttpTestingController;

    const apiBaseUrl = environment.apiBaseUrl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        service = TestBed.inject(AuthService);
        controller = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('deve fazer login e armazenar o token no localStorage', (done) => {
        service.login('user', 'password').subscribe(() => {
            expect(localStorage.getItem('token')).toBe(mockSession[0].token); // Verifica se o token foi armazenado
            done();
        });

        const req = controller.expectOne(`${apiBaseUrl}/api/v1/login`);
        expect(req.request.method).toBe('GET'); // Verifica o método HTTP
        req.flush(mockSession); // Simula a resposta da API
    });

    it('deve remover o token do localStorage ao fazer logout', () => {
        localStorage.setItem('token', mockSession[0].token); // Configura um token no localStorage
        service.logout();
        expect(localStorage.getItem('token')).toBeNull(); // Verifica se o token foi removido
    });

    it('deve retornar true se o token for válido', () => {
        localStorage.setItem('token', mockSession[0].token);
        expect(service.isAuthenticated()).toBeTrue(); // Verifica que o token não expirou
    });

    it('deve retornar false se o token não existe', () => {
        expect(service.isAuthenticated()).toBeFalse(); // Verifica que o token não existe
    });

    it('deve retornar o nome do usuário a partir do token', () => {
        localStorage.setItem('token', mockSession[0].token);
        expect(service.getUsername()).toBe('Teste'); // Verifica que o nome do usuário foi retornado
    });
});
