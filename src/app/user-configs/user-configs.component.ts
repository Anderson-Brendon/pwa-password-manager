import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormField} from '@angular/material/input';
import { DatabaseRxDbService } from '../database-rx-db.service';
import { Router } from '@angular/router';
import FileSaver from 'file-saver';
import { AuthenticationService } from '../authentication.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-user-configs',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,MatFormField ],
  templateUrl: './user-configs.component.html',
  styleUrl: './user-configs.component.css'
})

export class UserConfigsComponent implements OnInit{

  constructor(private databaseService: DatabaseRxDbService, private router: Router, private authService: AuthenticationService){}

  ngOnInit(): void {
    this.displayDefaultEmail();
  }

  jsonFile: any;

  currentEmail: string = '';

  exportDatabase(backupName: string){
    let accounts = this.databaseService.databaseInstance.accounts;
    accounts.exportJSON(true).then((jsonData:any) => {
      const file = new File([JSON.stringify(jsonData)], `${backupName}.json`, {type:'application/json'});
      FileSaver.saveAs(file);
    })
  }

  importDatabase(event:any) {

    console.log(event.target.files![0])

    const reader = new FileReader()

    const jsonFile = event.target.files![0]
    
    reader.onload = ()=>{
      this.databaseService.databaseInstance.accounts.importJSON(JSON.parse(reader.result as string)).then(()=>
      {'importação concluída'})
    }

    if(jsonFile){
      reader.readAsText(jsonFile)
    }
    
  };

  changeDefaultEmail(email: string){
    this.databaseService.insertUserEmail(email).then(() => {
      this.displayDefaultEmail();
    })
  }

  async displayDefaultEmail(){//metodo assincrono
    let userData = await this.databaseService.databaseInstance.user.findOne('1').exec();
    if(userData == null){this.databaseService.insertUserEmail('')}
      else{
        this.currentEmail = userData.defaultEmail
      }
  }

  async subscribeToEmailChanges() {//metodo com rxjs
    let result = await this.databaseService.databaseInstance.user.findOne('1').exec();
    if (result == null) { this.changeDefaultEmail(''); this.displayDefaultEmail() }
    else {
      result = await this.databaseService.databaseInstance.user.findOne('1').exec();
      result.$.subscribe((userData: any) => {
        this.currentEmail = userData.defaultEmail;
      });
    }
  }

  deleteDatabase(){
    this.databaseService.databaseInstance.remove();
    this.authService.loginOk = false;
    this.databaseService.databaseInstance.destroy();
    this.router.navigate(['/user-login']);
  }//pedir pra digitar texto ===
  
}
