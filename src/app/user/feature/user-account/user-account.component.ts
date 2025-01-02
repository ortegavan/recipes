import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../data/user.model';
import { AuthService } from '../../../auth/data/auth.service';
import { UserService } from '../../data/user.service';
import { first } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFormComponent } from '../../ui/user-form/user-form.component';
import { BannerComponent } from '../../../shared/ui/banner/banner.component';
import { MessageType } from '../../../shared/data/message-type.enum';
import { MessageComponent } from '../../../shared/ui/message/message.component';

@Component({
    selector: 'app-user-account',
    imports: [UserFormComponent, BannerComponent, MessageComponent],
    templateUrl: './user-account.component.html',
    styleUrl: './user-account.component.css',
})
export class UserAccountComponent implements OnInit {
    form!: FormGroup;
    user!: User;
    returnType = MessageType.none;
    message = '';

    authService = inject(AuthService);
    userService = inject(UserService);
    fb = inject(FormBuilder);

    ngOnInit(): void {
        this.configForm();
        this.getUser();
    }

    configForm() {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            birthday: ['', [Validators.required]],
        });
    }

    updateForm() {
        this.form.patchValue({
            name: this.user.name,
            email: this.user.email,
            birthday: new Date(this.user.birthday),
        });
    }

    getUser(): void {
        this.userService
            .getById(this.authService.getId())
            .pipe(first())
            .subscribe((user) => {
                this.user = user;
                this.updateForm();
            });
    }

    updateUser(form: FormGroup): void {
        if (form.invalid) {
            form.markAllAsTouched();
            return;
        }

        this.user.name = form.value.name;
        this.user.email = form.value.email;
        this.user.birthday = form.value.birthday;

        this.userService
            .update(this.user)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.returnType = MessageType.success;
                    this.message = 'Dados atualizados com sucesso!';
                },
                error: () => {
                    this.returnType = MessageType.error;
                    this.message =
                        'Ocorreu um erro, tente novamente mais tarde.';
                },
            });
    }
}
