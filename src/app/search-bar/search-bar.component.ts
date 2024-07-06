import { Component, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatInputModule,MatInput, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnChanges {

  constructor(){

  }

  @Output() searchEmitter = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  emitSearchValue(searchInput: string){
    this.searchEmitter.emit(searchInput)
  }
}
