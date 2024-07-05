import { Component, OnInit } from '@angular/core';
import { RxDocument } from 'rxdb';
import { DatabaseRxDbService } from '../database-rx-db.service';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule, MatFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-accounts-listing',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule,MatTooltip, MatFabButton, MatCardModule, RouterLink],
  templateUrl: './accounts-listing.component.html',
  styleUrl: './accounts-listing.component.css'
})
export class AccountsListingComponent {
  constructor(private databaseService: DatabaseRxDbService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.accounts = this.getAccountsListObserver();
  }

  accountsSearchResults: RxDocument<any>[] | null = null;

  messageNotFound: string = 'Nenhuma conta adicionada';

  accounts!: Observable<any>;

  getAccountsListObserver(): Observable<any>{
    const accountsCollection = this.getAccountsCollection();
    return accountsCollection.find().$;
  }

  async deleteAccount(accountDocument: RxDocument){
    accountDocument.remove().then(()=>{
      this.openSnackBar('Informações da conta removidas!','Ok')
    }
    )
  }

  getAccountsCollection(){
    return this.databaseService.databaseInstance.accounts;
  }

  displayAccountsList(accountList: RxDocument<any>[] | null){
    this.accountsSearchResults = accountList;
  }

  openSnackBar(text: string, action: string){
    this.snackBar.open(text, action)
    this.snackBar._openedSnackBarRef?._dismissAfter(3000)
  }

  async copyPasswordToClipBoard(password: string){
      try {
        await navigator.clipboard.writeText(password)
        this.openSnackBar('Senha foi copiada!', 'Fechar');
        console.log('copy success')
      } catch (error) {
        console.log('copy needs permission')
      }
  }
}

/*
subscribeToAccountsChanges(): Subscription{
    const accountsCollection = this.getAccountsCollection();
    return accountsCollection.find().$.subscribe((accounts: RxDocument[] | null) => {
      this.displayAccountsList(accounts)
    })
  } */
