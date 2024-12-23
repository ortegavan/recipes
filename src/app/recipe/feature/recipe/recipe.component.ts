import { Component, inject, input, OnInit, signal } from '@angular/core';
import { RecipeService } from '../../data/recipe.service';
import { first, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RecipeDetailComponent } from '../../ui/recipe-detail/recipe-detail.component';
import { Recipe } from '../../data/recipe.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommentService } from '../../../social/data/comment.service';
import { Comment } from '../../../social/data/comment.model';
import { CommentsComponent } from '../../../social/ui/comments/comments.component';
import { ReviewComponent } from '../../../social/ui/review/review.component';
import { RatingFormComponent } from '../../../social/ui/rating-form/rating-form.component';

@Component({
    selector: 'app-recipe',
    imports: [
        AsyncPipe,
        RecipeDetailComponent,
        CommentsComponent,
        ReviewComponent,
        RatingFormComponent,
    ],
    templateUrl: './recipe.component.html',
    styleUrl: './recipe.component.css',
})
export class RecipeComponent implements OnInit {
    id = input<string>();

    recipeService = inject(RecipeService);
    commentService = inject(CommentService);
    fb = inject(FormBuilder);

    recipe$!: Observable<Recipe>;
    comments = this.commentService.comments;

    ratingForm = this.fb.group({
        rating: ['', Validators.required],
        comment: ['', Validators.required],
    });
    showRatingForm = signal<boolean>(false);

    ngOnInit() {
        const id = this.id();

        this.recipe$ = this.recipeService.getById(id ?? '');
        this.commentService
            .get(id ?? '')
            .pipe(first())
            .subscribe();
    }

    addComment(form: FormGroup) {
        if (form.invalid) {
            form.markAllAsTouched();
            return;
        }

        const comment = {
            createdAt: new Date(),
            recipeId: this.id(),
            userId: '123456',
            userName: 'Anônimo',
            rating: form.value.rating,
            comment: form.value.comment,
        } as Comment;
        this.commentService.add(comment).pipe(first()).subscribe();
        this.closeRatingForm();
    }

    openRatingForm() {
        this.showRatingForm.set(true);
    }

    closeRatingForm() {
        this.showRatingForm.set(false);
    }
}
