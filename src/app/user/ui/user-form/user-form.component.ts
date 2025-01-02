import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-user-form',
    imports: [
        ReactiveFormsModule,
        DatePickerModule,
        MessageModule,
        InputTextModule,
        ButtonModule,
    ],
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.css',
})
export class UserFormComponent {
    form = input.required<FormGroup>();
    saveEvent = output<FormGroup>();

    get name() {
        return this.form().get('name');
    }

    get email() {
        return this.form().get('email');
    }

    get birthday() {
        return this.form().get('birthday');
    }
}
