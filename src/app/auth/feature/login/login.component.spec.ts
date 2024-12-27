import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    FormControl,
} from '@angular/forms';
import { of } from 'rxjs';
import { mockSession } from '../../data/session.mock';
import { AuthService } from '../../data/auth.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let mockAuthService: any;

    beforeEach(async () => {
        mockAuthService = {
            login: jasmine.createSpy('login').and.returnValue(of(mockSession)),
        };

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [{ provide: AuthService, useValue: mockAuthService }],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;

        const fb = TestBed.inject(FormBuilder);
        component.form = fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });

        fixture.detectChanges();
    });

    it('deve interromper o fluxo de login se o formulário for inválido', () => {
        component.form.controls['email'].setValue('');
        component.form.controls['password'].setValue('');
        component.login();

        expect(component.form.invalid).toBeTrue();
        expect(mockAuthService.login).not.toHaveBeenCalled();
    });

    it('deve continuar com o fluxo de login se o formulário for válido', () => {
        const email = 'teste@teste.com';
        const password = 'teste';

        component.form.controls['email'].setValue(email);
        component.form.controls['password'].setValue(password);
        component.login();

        expect(mockAuthService.login).toHaveBeenCalledWith(email, password);
    });

    it('deve substituir os valores do formulário por string vazia se nulos', () => {
        component.form.controls['email'] = new FormControl(null);
        component.form.controls['password'] = new FormControl(null);
        component.form.updateValueAndValidity();

        component.login();

        expect(mockAuthService.login).toHaveBeenCalled();
    });
});
