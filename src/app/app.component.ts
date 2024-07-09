import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthenticationService } from './authentication.service';
import { slideInAnimation } from './animations';
import { RouterLink } from '@angular/router';
import { ChildrenOutletContexts } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    slideInAnimation
  ]
})

export class AppComponent {

  constructor(public authService: AuthenticationService, private contexts: ChildrenOutletContexts){}

  title = 'pwa-password-manager';

  pwa = '';

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
