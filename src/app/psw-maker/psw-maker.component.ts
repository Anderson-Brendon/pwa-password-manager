import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RandomPasswordCreatorService } from '../random-password-creator.service';

@Component({
  selector: 'app-psw-maker',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatCheckboxModule, MatSliderModule,FormsModule, ReactiveFormsModule],
  templateUrl: './psw-maker.component.html',
  styleUrl: './psw-maker.component.css'
})
export class PswMakerComponent {

  constructor(private passwordCreator: RandomPasswordCreatorService){
    this.creationForm = new FormGroup({
      length: new FormControl(1),
      upperCase: new FormControl(false),
      symbols: new FormControl(false),
      numbers: new FormControl(false)
    })
    
  }

  passwordResult : string | null = null

  creationForm : FormGroup ; 
  
  createPassword(){
    this.passwordResult = this.passwordCreator.create(
      this.creationForm.value.length,
      this.creationForm.value.upperCase,
      this.creationForm.value.numbers,
      this.creationForm.value.symbols
    )
  }

  displayPassword(){
    
  }

  copyPasswordResult(){
    try {
      navigator.clipboard.writeText(this.passwordResult!);
    } catch (error) {
      console.log(error)
    }
  }

}
