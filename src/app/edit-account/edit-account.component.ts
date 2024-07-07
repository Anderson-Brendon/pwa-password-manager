import { Component} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatabaseRxDbService } from '../database-rx-db.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RxDocument } from 'rxdb';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit-account',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatDividerModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.css'
})
export class EditAccountComponent{

  constructor(private databaseService: DatabaseRxDbService, private activatedRoute: ActivatedRoute, 
    private snackBar: MatSnackBar){
    this.accountId = this.getAccountId();
    this.getAccountData();  
  }
  

  accountForm!: FormGroup ;

  accountId: string | null;

  account!: RxDocument<any>;

  
  async getAccountData() {
    this.account = await this.databaseService.getAccountById(this.accountId).exec();
    this.accountForm = new FormGroup({
      title: new FormControl(this.account.title, Validators.required),
      password: new FormControl(this.account.password, Validators.required),
      email: new FormControl(this.account.email, Validators.required),
      favIconUrl: new FormControl(this.account.favIcon),
      description: new FormControl(this.account.description)
    }
    )
  }

  onSuccessMessage(){
    this.snackBar.open('Informações sobre conta alteradas!', 'Ok');
    this.snackBar._openedSnackBarRef?._dismissAfter(3000);
  }

  getAccountId(): string | null{
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  async storeModifiedAccount() {
    try {
      await this.databaseService.editAccount(this.account, this.accountForm.value.title,
      this.accountForm.value.email, this.accountForm.value.password, 
      this.accountForm.value.favIconUrl, this.accountForm.value.description)
      this.onSuccessMessage();
    } catch (error) {
      console.log(error)
    }
  }

}
