import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,MatButtonModule, MatTooltipModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
