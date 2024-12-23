import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FirstLetterPipe } from '../../util/first-letter.pipe';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Comment } from '../../data/comment.model';

@Component({
    selector: 'app-comments',
    imports: [DatePipe, FirstLetterPipe, RatingModule, FormsModule],
    templateUrl: './comments.component.html',
    styleUrl: './comments.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent {
    comments = input<Comment[]>();
}
