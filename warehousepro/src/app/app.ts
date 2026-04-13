import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root App Component
 * Simply renders the router outlet for all routes
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class App {}
