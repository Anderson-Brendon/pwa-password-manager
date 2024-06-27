import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormField} from '@angular/material/input';

@Component({
  selector: 'app-user-configs',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,MatFormField ],
  templateUrl: './user-configs.component.html',
  styleUrl: './user-configs.component.css'
})

export class UserConfigsComponent {

}
