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

  changeLoginState(){
    this.loginOk = this.rxdbService.isConnectedToDb();
  }

  async login(masterPsw: string){
    try {
      await this.rxdbService.startDatabaseInstance(masterPsw);
      this.changeLoginState();
    } catch (error) {
      this.isPasswordWrong = true
      console.log(error)
    }
  }

  logout(){
    this.loginOk = false
    this.router.navigate(['user-login']);
  }
  
}
