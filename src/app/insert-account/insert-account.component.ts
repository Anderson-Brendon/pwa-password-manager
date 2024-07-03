import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-insert-account',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, RouterLink, MatDividerModule,MatFormFieldModule],
  templateUrl: './insert-account.component.html',
  styleUrl: './insert-account.component.css'
})
export class InsertAccountComponent {

}
