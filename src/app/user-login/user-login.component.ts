import { Component, inject} from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { DatabaseRxDbService } from '../database-rx-db.service';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [MatFormField,MatButtonModule,MatInput,FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})

export class UserLoginComponent {
  
  constructor(private rxdbService : DatabaseRxDbService, public authService: AuthenticationService,
  private router: Router){}

  masterKey = '';

  warningMessage: string = 'Senha incorreta';


  checkIfMasterKeyExists(){}
  
  readonly dialog = inject(MatDialog);
  
  async tryLogin(){
    await this.authService.login(this.masterKey);
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/accounts-list']);
    }else{
      this.dialog.open(InfoDialogComponent, {data: {title: 'Aviso', about:'Senha incorreta'}})
    };
  }

  openDialogAboutApp(){
    this.dialog.open(InfoDialogComponent, {data: {title:'Sobre o app',aboutApp:true}})
  }

}
