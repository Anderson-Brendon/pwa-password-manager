import { Component, inject } from '@angular/core';
import { DatabaseRxDbService } from '../database-rx-db.service';
import { UserConfigsComponent } from '../user-configs/user-configs.component';
import { MAT_DIALOG_DATA,MatDialogActions,MatDialogClose,MatDialogContent,
  MatDialogRef,MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-dialog-user-configs',
  standalone: true,
  imports: [MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './dialog-user-configs.component.html',
  styleUrl: './dialog-user-configs.component.css'
})
export class DialogUserConfigsComponent {
  
  constructor(public databaseService: DatabaseRxDbService, public authService: AuthenticationService){}

  readonly dialogRef = inject(MatDialogRef<UserConfigsComponent>);
  
  readonly data = inject(MAT_DIALOG_DATA);

  closeDialog(): void{
    this.dialogRef.close()
  }
  
  email : string | null= null;
}
