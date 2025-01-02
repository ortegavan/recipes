import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAccountComponent } from './user-account.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { mockUser } from '../../data/user.mock';
import { AuthService } from '../../../auth/data/auth.service';
import { UserService } from '../../data/user.service';
import { of, throwError } from 'rxjs';
import { MessageType } from '../../../shared/data/message-type.enum';

describe('UserAccountComponent', () => {
    let component: UserAccountComponent;
    let fixture: ComponentFixture<UserAccountComponent>;
    let fakeAuthService: any;
    let fakeUserService: any;

    beforeEach(async () => {
        fakeAuthService = {
            getId: jasmine.createSpy('login').and.returnValue(of('1')),
        };

        fakeUserService = {
            getById: jasmine.createSpy('getById').and.returnValue(of(mockUser)),
            update: jasmine.createSpy('update').and.returnValue(of(mockUser)),
        };

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [
                { provide: AuthService, useValue: fakeAuthService },
                { provide: UserService, useValue: fakeUserService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(UserAccountComponent);
        component = fixture.componentInstance;

        const fb = TestBed.inject(FormBuilder);
        component.form = fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            birthday: ['', Validators.required],
        });

        fixture.detectChanges();
    });

    it('deve seguir o fluxo de atualização se o formulário for válido', () => {
        const name = 'Teste';
        const email = 'teste@teste.com';
        const birthday = '01/01/2000';

        component.form.controls['name'].setValue(name);
        component.form.controls['email'].setValue(email);
        component.form.controls['birthday'].setValue(birthday);
        component.updateUser(component.form);

        expect(fakeUserService.update).toHaveBeenCalled();
    });

    it('deve interromper o fluxo de atualização se formulário inválido', () => {
        component.form.controls['name'].setValue('');
        component.form.controls['email'].setValue('');
        component.form.controls['birthday'].setValue('');
        component.updateUser(component.form);

        expect(fakeUserService.update).not.toHaveBeenCalled();
    });

    it('deve exibir mensagem de erro se a atualização falhar', () => {
        const name = 'Teste';
        const email = 'teste@teste.com';
        const birthday = '01/01/2000';

        component.form.controls['name'].setValue(name);
        component.form.controls['email'].setValue(email);
        component.form.controls['birthday'].setValue(birthday);

        fakeUserService.update.and.returnValue(
            throwError(() => new Error('Erro de atualização')),
        );

        component.updateUser(component.form);

        expect(fakeUserService.update).toHaveBeenCalled();

        expect(component.returnType).toBe(MessageType.error);
        expect(component.message).toBe(
            'Ocorreu um erro, tente novamente mais tarde.',
        );
    });
});
