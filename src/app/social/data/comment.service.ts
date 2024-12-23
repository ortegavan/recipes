import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Comment } from './comment.model';

@Injectable({
    providedIn: 'root',
})
export class CommentService {
    httpClient = inject(HttpClient);
    apiBaseUrl = environment.apiBaseUrl;

    private commentsSubject = new BehaviorSubject<Comment[]>([]);
    comments$ = this.commentsSubject.asObservable();

    public get(recipeId: string): Observable<Comment[]> {
        return this.httpClient
            .get<Comment[]>(`${this.apiBaseUrl}/api/v1/comments`, {
                params: {
                    recipeId,
                },
            })
            .pipe(tap((comments) => this.commentsSubject.next(comments)));
    }

    public add(comment: Comment): Observable<Comment> {
        return this.httpClient
            .post<Comment>(`${this.apiBaseUrl}/api/v1/comments`, comment)
            .pipe(
                tap((newComment) => {
                    const currentComments = this.commentsSubject.value;
                    this.commentsSubject.next([...currentComments, newComment]);
                }),
            );
    }
}