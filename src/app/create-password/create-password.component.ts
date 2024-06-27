import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-create-password',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, RouterLink, MatDividerModule,MatFormFieldModule],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.css'
})
export class CreatePasswordComponent {

}
