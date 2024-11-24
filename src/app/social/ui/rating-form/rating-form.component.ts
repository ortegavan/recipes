import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';

@Component({
    selector: 'app-rating-form',
    imports: [
        DialogModule,
        ButtonModule,
        RatingModule,
        InputTextareaModule,
        ReactiveFormsModule,
    ],
    templateUrl: './rating-form.component.html',
    styleUrl: './rating-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingFormComponent {
    @Input() visible!: boolean;
    @Input() form!: FormGroup;
    @Output() saveEvent = new EventEmitter<FormGroup>();
    @Output() closeEvent = new EventEmitter<void>();

    get rating() {
        return this.form.get('rating');
    }

    get comment() {
        return this.form.get('comment');
    }
}
