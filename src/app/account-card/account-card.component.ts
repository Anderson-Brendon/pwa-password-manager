import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RxDocument } from 'rxdb';
import { DatabaseRxDbService } from '../database-rx-db.service';
import { MatButtonModule, MatFabButton } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-card',
  standalone: true,
  imports: [MatCardModule,MatButtonModule, MatFabButton, MatMenuModule,MatTooltipModule, RouterLink],
  templateUrl: './account-card.component.html',
  styleUrl: './account-card.component.css'
})
export class AccountCardComponent {

  constructor(private databaseService: DatabaseRxDbService, private snackBar: MatSnackBar){}

  @Input()

  account!: any

  async copyPasswordToClipBoard(password: string) {
    try {
      await navigator.clipboard.writeText(password)
      this.openSnackBar('Senha foi copiada!', 'Ok');
      console.log('copy success')
    } catch (error) {
      console.log('copy needs permission')
    }
  }

  openSnackBar(text: string, action: string) {
    this.snackBar.open(text, action)
    this.snackBar._openedSnackBarRef?._dismissAfter(3000)
  }

  async deleteAccount(accountDocument: RxDocument){
    accountDocument.remove().then(()=>{
      this.openSnackBar('Informações da conta removidas!','Ok')
    }
    )
  }

}
