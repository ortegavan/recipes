import { Component } from '@angular/core';
import { HeaderComponent } from './shared/ui/header/header.component';
import { RecipesComponent } from './recipe-management/feature/recipes/recipes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RecipesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'My Recipe Book';
}
