import {
    ChangeDetectionStrategy,
    Component,
    input,
    OnChanges,
    output,
} from '@angular/core';
import { Comment } from '../../data/comment.model';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-review',
    imports: [RatingModule, ButtonModule, FormsModule],
    templateUrl: './review.component.html',
    styleUrl: './review.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent implements OnChanges {
    comments = input<Comment[]>();
    addRatingEvent = output<void>();

    rating = 0;
    map = new Map<number, number>();

    ngOnChanges(): void {
        const comments = this.comments();
        if (comments) {
            this.rating =
                comments.length <= 0
                    ? 0
                    : comments.reduce(
                          (acc, comment) => acc + comment.rating,
                          0,
                      ) / comments.length;

            for (let i = 5; i > 0; i--) {
                this.map.set(
                    i,
                    comments.filter((comment) => comment.rating === i).length,
                );
            }
        }
    }

    get entries() {
        return Array.from(this.map.entries());
    }
}
