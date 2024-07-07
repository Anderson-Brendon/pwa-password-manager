import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatabaseRxDbService } from '../database-rx-db.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-insert-account',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatDividerModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './insert-account.component.html',
  styleUrl: './insert-account.component.css'
})
export class InsertAccountComponent {

  constructor(private databaseService: DatabaseRxDbService) { }

  accountForm: FormGroup = new FormGroup({
    accountTitle: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    favIconUrl: new FormControl(null),
    description: new FormControl(null)
  })

  storeAccount() {
    this.databaseService.insertAccount(this.accountForm.value.accountTitle, 
      this.accountForm.value.email, this.accountForm.value.password, this.accountForm.value.favIconUrl, this.accountForm.value.description
    ).then(
      ()=>{
        console.log('conta adicionada');
        this.resetForm();
      }
    )
  }

  resetForm(){
    this.accountForm.reset('');
  }
}
