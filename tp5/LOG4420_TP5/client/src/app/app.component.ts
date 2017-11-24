import { Component, OnInit} from '@angular/core';

/**
 * Defines the main component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  // TODO: Modifier le nom des auteurs pour vos noms
  readonly authors = [
    'Ba Samson Lam',
    'Sorneau Clément'
  ];

  // TODO: À compléter
}
