import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Recipe } from '../../data/recipe.model';
import { RecipeService } from '../../data/recipe.service';
import { AsyncPipe } from '@angular/common';
import { RecipeDetailComponent } from '../../ui/recipe-detail/recipe-detail.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommentService } from '../../../social/data/comment.service';
import { Comment } from '../../../social/data/comment.model';
import { RatingFormComponent } from '../../../social/ui/rating-form/rating-form.component';
import { CommentsComponent } from '../../../social/ui/comments/comments.component';
import { ReviewComponent } from '../../../social/ui/review/review.component';

@Component({
    selector: 'app-recipe',
    imports: [
        AsyncPipe,
        RecipeDetailComponent,
        RatingFormComponent,
        CommentsComponent,
        ReviewComponent,
    ],
    templateUrl: './recipe.component.html',
    styleUrl: './recipe.component.css',
})
export class RecipeComponent implements OnInit {
    @Input() id!: string;

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
        this.recipe$ = this.recipeService.getById(this.id);
        this.commentService.get(this.id).pipe(first()).subscribe();
    }

    addComment(form: FormGroup) {
        if (form.invalid) {
            form.markAllAsTouched();
            return;
        }

        const comment = {
            createdAt: new Date(),
            recipeId: this.id,
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
