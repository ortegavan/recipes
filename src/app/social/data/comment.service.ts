import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Comment } from './comment.model';

@Injectable({
    providedIn: 'root',
})
export class CommentService {
    httpClient = inject(HttpClient);
    apiBaseUrl = environment.apiBaseUrl;

    comments = signal<Comment[]>([]);

    public get(recipeId: string): Observable<Comment[]> {
        return this.httpClient
            .get<Comment[]>(`${this.apiBaseUrl}/api/v1/comments`, {
                params: {
                    recipeId,
                },
            })
            .pipe(
                catchError(() => {
                    this.comments.set([]);
                    return [];
                }),
                tap((comments) => this.comments.set(comments)),
            );
    }

    public add(comment: Comment): Observable<Comment> {
        return this.httpClient
            .post<Comment>(`${this.apiBaseUrl}/api/v1/comments`, comment)
            .pipe(
                tap((newComment) => {
                    const currentComments = this.comments();
                    this.comments.set([...currentComments, newComment]);
                }),
            );
    }
}
