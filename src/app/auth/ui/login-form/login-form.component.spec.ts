import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

describe('LoginFormComponent', () => {
    let component: LoginFormComponent;
    let fixture: ComponentFixture<LoginFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginFormComponent);
        fixture.componentRef.setInput(
            'form',
            new FormGroup({
                email: new FormControl('', Validators.required),
                password: new FormControl('', Validators.required),
            }),
        );

        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('deve validar o formulário como inválido quando vazio', () => {
        expect(component.form().valid).toBeFalse();
        expect(component.email?.valid).toBeFalse();
        expect(component.password?.valid).toBeFalse();
    });

    it('deve validar o formulário como válido quando preenchido corretamente', () => {
        component.form().patchValue({
            email: 'teste@exemplo.com',
            password: '123456',
        });
        expect(component.form().valid).toBeTrue();
        expect(component.email?.valid).toBeTrue();
        expect(component.password?.valid).toBeTrue();
    });
});
