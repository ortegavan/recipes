import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
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
    @Input() comments!: Comment[];
    @Output() addRatingEvent = new EventEmitter<void>();

    rating = 0;
    map = new Map<number, number>();

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['comments']) {
            this.rating =
                this.comments.length <= 0
                    ? 0
                    : this.comments.reduce(
                          (acc, comment) => acc + comment.rating,
                          0,
                      ) / this.comments.length;

            for (let i = 5; i > 0; i--) {
                this.map.set(
                    i,
                    this.comments.filter((comment) => comment.rating === i)
                        .length,
                );
            }
        }
    }

    get entries() {
        return Array.from(this.map.entries());
    }
}
