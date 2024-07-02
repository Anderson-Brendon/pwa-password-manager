import { Injectable, inject } from '@angular/core';
import { DatabaseRxDbService } from './database-rx-db.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private rxdbService : DatabaseRxDbService, private router: Router) { }


  loginOk = false;

  isPasswordWrong = false;

  isLoggedIn(){
    return this.rxdbService.isConnectedToDb();
  }

  async login(masterPsw: string){
    try {
      await this.rxdbService.startDatabaseInstance(masterPsw);
      this.loginOk = this.rxdbService.isConnectedToDb();
    } catch (error) {
      this.isPasswordWrong = true
      return 
    }
  }
}
