import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-login-form',
    imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
    form = input.required<FormGroup>();
    submitEvent = output<void>();

    get email() {
        return this.form().get('email');
    }

    get password() {
        return this.form().get('password');
    }
}
