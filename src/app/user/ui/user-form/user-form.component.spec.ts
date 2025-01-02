import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

describe('UserFormComponent', () => {
    let component: UserFormComponent;
    let fixture: ComponentFixture<UserFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(UserFormComponent);
        fixture.componentRef.setInput(
            'form',
            new FormGroup({
                name: new FormControl('', Validators.required),
                email: new FormControl('', [
                    Validators.required,
                    Validators.email,
                ]),
                birthday: new FormControl('', Validators.required),
            }),
        );

        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('deve validar o formulário como inválido quando vazio', () => {
        expect(component.form().valid).toBeFalse();
    });

    it('deve validar o formulário como válido quando preenchido corretamente', () => {
        component.form().patchValue({
            name: 'Teste',
            email: 'teste@teste.com',
            birthday: '2000-01-01',
        });
        expect(component.form().valid).toBeTrue();
    });
});
