import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    inject,
    Input,
    Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Recipe } from '../../data/recipe.model';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-banner',
    imports: [
        InputGroupModule,
        InputGroupAddonModule,
        InputTextModule,
        ReactiveFormsModule,
    ],
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {
    elementRef = inject(ElementRef);

    @Input({ required: true }) searchControl!: FormControl;
    @Input({ required: true }) recipes!: Recipe[] | null;
    @Output() goToRecipeEvent = new EventEmitter<string>();

    @HostListener('document:click', ['$event'])
    clickOut(event: MouseEvent) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.recipes = null;
        }
    }
}
