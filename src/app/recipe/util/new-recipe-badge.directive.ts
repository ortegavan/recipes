import {
    Directive,
    ElementRef,
    inject,
    Input,
    OnInit,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[appNewRecipeBadge]',
})
export class NewRecipeBadgeDirective implements OnInit {
    el = inject(ElementRef);
    renderer = inject(Renderer2);

    @Input() appNewRecipeBadge!: boolean;

    ngOnInit(): void {
        if (!this.appNewRecipeBadge) {
            return;
        }

        // Cria o elemento span para o texto "Nova!"
        const badge = this.renderer.createElement('span');
        const text = this.renderer.createText('Nova!');

        // Adiciona o texto ao span
        this.renderer.appendChild(badge, text);

        // Adiciona a classe CSS ao badge
        this.renderer.addClass(badge, 'new-badge');

        // Adiciona o badge ao final do título (h3)
        this.renderer.appendChild(this.el.nativeElement, badge);
    }
}
