import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Session } from './session.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    httpClient = inject(HttpClient);
    apiBaseUrl = environment.apiBaseUrl;

    public login(username: string, password: string): Observable<Session[]> {
        return this.httpClient
            .get<Session[]>(`${this.apiBaseUrl}/api/v1/login`)
            .pipe(
                tap((session) =>
                    localStorage.setItem('token', session[0].token),
                ),
            );
    }

    public logout(): void {
        localStorage.removeItem('token');
    }

    public isAuthenticated(): boolean {
        const payload = this.getPayload();
        return payload ? payload.exp * 1000 > Date.now() : false;
    }

    public getUsername(): string {
        const payload = this.getPayload();
        return payload ? payload.name : '';
    }

    public getId(): string {
        const payload = this.getPayload();
        return payload ? payload.sub : '';
    }

    private getPayload(): any {
        const token = localStorage.getItem('token');
        if (!token) return null;

        return JSON.parse(atob(token.split('.')[1]));
    }
}
