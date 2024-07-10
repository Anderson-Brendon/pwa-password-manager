import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormField} from '@angular/material/input';
import { DatabaseRxDbService } from '../database-rx-db.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import {MatDialog} from '@angular/material/dialog';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogUserConfigsComponent } from '../dialog-user-configs/dialog-user-configs.component';

@Component({
  selector: 'app-user-configs',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,MatFormField ],
  templateUrl: './user-configs.component.html',
  styleUrl: './user-configs.component.css'
})

export class UserConfigsComponent{
  
  constructor(public databaseService: DatabaseRxDbService, private router: Router, private authService: AuthenticationService, private snackBar: MatSnackBar){
    this.accountsCollection = this.databaseService.databaseInstance.accounts;
  }

  userDocument: any;

  jsonFile: any;

  defaultEmail: any;

  accountsCollection: any

  dialogRef : any;

  readonly dialog = inject(MatDialog);

  readonly infos = {exportInfo: {title:'Sobre exportação de backup', 
  about: "Um arquivo json será criado com  todos os dados sobre as senhas que serão descriptogradas, use esse arquivo ao importar."},
  importInfo: {title:'Sobre importação de backup', about:'Exporte os dados de um arquivo json criado anteriormente.'}, 
  deleteDatabase:{title: 'Deletar dados', about:'Isso vai deletar todos os dados, que só podem ser recuperados com um backup, tem certeza?'},
  changeEmail:{title:'Alterar email padrão', about: 'Insira um email que será utilizado para preencher o campo do formulário de maneira automática.'}}

  openDialogAboutImport(input: any):void{
    this.dialogRef = this.dialog.open(DialogUserConfigsComponent,{
      data:{info: this.infos.importInfo, fileInput: input}
    })
  }

  openDialogAboutExport():void{
    this.dialogRef = this.dialog.open(DialogUserConfigsComponent,{
      data:{info: this.infos.exportInfo, exportDatabase: true}
    })
  }

  openDialogAboutDatabaseDeletion():void{
    this.dialog.open(DialogUserConfigsComponent,{
      data:{info: this.infos.deleteDatabase, deleteDatabase: true}
    })
  }

  async openDialogAboutEmail(){
    this.dialog.open(DialogUserConfigsComponent,{
      data:{info: this.infos.changeEmail}
    })
  }

  openSnackBar(text : string, action: string){
    this.snackBar.open(text, action);
  }

  closeDialog(){
    this.dialogRef.close();
  }

  importDatabase(event:any) {

    console.log(event.target.files![0])

    const reader = new FileReader()

    const jsonFile = event.target.files![0]
    
    reader.onload = ()=>{
      this.databaseService.databaseInstance.accounts.importJSON(JSON.parse(reader.result as string)).then(()=>
      this.closeDialog(),
      this.openSnackBar('Importação de dados concluída!', 'Ok')
      )
    }

    if(jsonFile){
      reader.readAsText(jsonFile)
    }

  }
  
}