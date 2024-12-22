import { Component, inject } from '@angular/core';
import { LoginFormComponent } from '../../ui/login-form/login-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../data/auth.service';
import { first, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [LoginFormComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    authService = inject(AuthService);
    router = inject(Router);
    fb = inject(FormBuilder);

    form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    });

    login() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.authService
            .login(this.form.value.email ?? '', this.form.value.password ?? '')
            .pipe(
                first(),
                tap(() => {
                    this.router.navigate(['/minha-conta']);
                }),
            )
            .subscribe();
    }
}
