import { Component } from '@angular/core';
import { RxDocument } from 'rxdb';
import { DatabaseRxDbService } from '../database-rx-db.service';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AccountCardComponent } from '../account-card/account-card.component';

@Component({
  selector: 'app-accounts-listing',
  standalone: true,
  imports: [AsyncPipe, MatTooltip, MatCardModule, RouterLink,MatFormFieldModule,FormsModule,MatInputModule,AccountCardComponent],
  templateUrl: './accounts-listing.component.html',
  styleUrl: './accounts-listing.component.css'
})
export class AccountsListingComponent {
  constructor(private databaseService: DatabaseRxDbService){}

  ngOnInit(): void {
    this.accounts$ = this.getAccountsListObserver();
  }

  accountsFound: RxDocument<any>[] | string = '';

  messageNotFound: string = 'Nenhuma conta adicionada';

  accounts$!: Observable<any>;

  searchInput: string = '';

  getAccountsListObserver(): Observable<any>{
    const accountsCollection = this.getAccountsCollection();
    return accountsCollection.find().$;
  }

  getAccountsCollection(){
    return this.databaseService.databaseInstance.accounts;
  }

  searchAccounts() {
    this.databaseService.databaseInstance.accounts.find({
      selector: {
        title: {$regex: '^' + this.searchInput, $options: 'i'}
      }
    }).exec().then((value: any) => {
      this.accountsFound = value
    })
  }

}
// displayAccountsList(accountList: RxDocument<any>[] | null){
  //   this.accountsSearchResults = accountList;
  // }

/*
subscribeToAccountsChanges(): Subscription{
    const accountsCollection = this.getAccountsCollection();
    return accountsCollection.find().$.subscribe((accounts: RxDocument[] | null) => {
      this.displayAccountsList(accounts)
    })
  } */
