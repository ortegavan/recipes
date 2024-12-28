import { TestBed } from '@angular/core/testing';
import { CommentService } from './comment.service';
import { provideHttpClient } from '@angular/common/http';
import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { mockComments } from './comments.mock';
import { Comment } from './comment.model';

describe('CommentService', () => {
    let service: CommentService;
    let controller: HttpTestingController;
    const apiBaseUrl = environment.apiBaseUrl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        service = TestBed.inject(CommentService);
        controller = TestBed.inject(HttpTestingController);
    });

    it('deve buscar comentários para uma receita específica', (done) => {
        const recipeId = '1';

        service.get(recipeId).subscribe((comments) => {
            expect(comments).toEqual(mockComments);
            done();
        });

        const req = controller.expectOne(
            `${apiBaseUrl}/api/v1/comments?recipeId=${recipeId}`,
        );
        expect(req.request.method).toEqual('GET');
        req.flush(mockComments);
    });

    it('deve adicionar um novo comentário e atualizar o estado local', (done) => {
        const newComment = {
            id: '3',
            createdAt: new Date(),
            recipeId: '1',
            userId: '3',
            userName: 'Charlie',
            rating: 3,
            comment: 'Achei a receita meio sem graça.',
        } as Comment;

        service.add(newComment).subscribe((comment) => {
            expect(comment).toEqual(newComment);
            expect(service.comments()).toContain(newComment);
            done();
        });

        const req = controller.expectOne(`${apiBaseUrl}/api/v1/comments`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newComment);
        req.flush(newComment);
    });

    it('deve retornar um array vazio e limpar o cache ao ocorrer erro', () => {
        const recipeId = '1';
        spyOn(service.comments, 'set').and.callThrough();

        service.get(recipeId).subscribe((comments) => {
            expect(comments).toEqual([]);
        });

        const req = controller.expectOne(
            `${service.apiBaseUrl}/api/v1/comments?recipeId=${recipeId}`,
        );
        req.flush(null, { status: 500, statusText: 'Internal Server Error' });

        expect(service.comments.set).toHaveBeenCalledWith([]);
    });
});
