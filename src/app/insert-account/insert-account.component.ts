import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatabaseRxDbService } from '../database-rx-db.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
@Component({
  selector: 'app-insert-account',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatDividerModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './insert-account.component.html',
  styleUrl: './insert-account.component.css'
})
export class InsertAccountComponent {

  constructor(private databaseService: DatabaseRxDbService, private snackBar: MatSnackBar) {

   }

  readonly dialog = inject(MatDialog);
  
  accountForm: FormGroup = new FormGroup({
    accountTitle: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    email: new FormControl(this.databaseService.userData.defaultEmail, Validators.required),
    favIconUrl: new FormControl(null),
    description: new FormControl(null)
  })

  storeAccount(){
    if(this.checkData()){
      this.databaseService.insertAccount(this.accountForm.value.accountTitle, 
        this.accountForm.value.email, this.accountForm.value.password, this.accountForm.value.favIconUrl, this.accountForm.value.description
      ).then(
        ()=>{
          this.resetForm()
          this.openSnackBar('Conta foi adicionada!');
        }
      )
    }
  }

  checkData(){
    if(this.accountForm.valid){
      return true;
    }else{
      this.dialog.open(InfoDialogComponent, {data:{title:'Aviso', about: 'Os campos: título, email e senha devem ser preenchidos'}})
      return false;
    }
  }

  openSnackBar(text: string){
    this.snackBar.open(text, 'Ok');
    this.snackBar._openedSnackBarRef?._dismissAfter(3000)
  }

  resetForm(){
    this.accountForm.reset({
      email: this.databaseService.userData.defaultEmail
    })
  }
}
