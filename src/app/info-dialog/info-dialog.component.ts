import { Component } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogActions,MatDialogClose,MatDialogContent,
MatDialogRef,MatDialogTitle} from '@angular/material/dialog';
import { inject } from '@angular/core';
import { UserConfigsComponent } from '../user-configs/user-configs.component';
import { DatabaseRxDbService } from '../database-rx-db.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.css'
})

export class InfoDialogComponent {

  constructor(public databaseService: DatabaseRxDbService){}

  readonly dialogRef = inject(MatDialogRef<UserConfigsComponent>);
  
  readonly data = inject(MAT_DIALOG_DATA);

  closeDialog(): void{
    this.dialogRef.close()
  }
  
}
