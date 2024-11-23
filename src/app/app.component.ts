import { Component } from '@angular/core';
import { HeaderComponent } from './shared/ui/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [HeaderComponent, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'My Recipe Book';
}
