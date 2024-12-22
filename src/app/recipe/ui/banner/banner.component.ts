import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    inject,
    input,
    model,
    output,
} from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Recipe } from '../../data/recipe.model';

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

    searchControl = input.required<FormControl>();
    recipes = model<Recipe[] | null>();
    goToRecipeEvent = output<string>();

    @HostListener('document:click', ['$event'])
    clickOut(event: MouseEvent) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.recipes.set(null);
        }
    }
}
