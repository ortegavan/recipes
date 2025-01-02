import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from './user.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    httpClient = inject(HttpClient);
    apiBaseUrl = environment.apiBaseUrl;

    public getById(id: string): Observable<User> {
        return this.httpClient.get<User>(
            `${this.apiBaseUrl}/api/v1/users/${id}`,
        );
    }

    public update(user: User): Observable<User> {
        user.updatedAt = new Date();
        return this.httpClient.put<User>(
            `${this.apiBaseUrl}/api/v1/users/${user.id}`,
            user,
        );
    }
}
