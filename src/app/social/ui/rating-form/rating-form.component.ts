import {
    ChangeDetectionStrategy,
    Component,
    input,
    model,
    output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { RatingModule } from 'primeng/rating';

@Component({
    selector: 'app-rating-form',
    imports: [
        DialogModule,
        ButtonModule,
        RatingModule,
        TextareaModule,
        ReactiveFormsModule,
    ],
    templateUrl: './rating-form.component.html',
    styleUrl: './rating-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingFormComponent {
    visible = model.required<boolean>();
    form = input.required<FormGroup>();
    saveEvent = output<FormGroup>();
    closeEvent = output<void>();

    get rating() {
        return this.form().get('rating');
    }

    get comment() {
        return this.form().get('comment');
    }
}
