import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { ApiService } from '../shared/services/api-service';
import { SignalStore } from '../shared/services/signal-store';

@Component({
  selector: 'app-search-bar-component',
  imports: [CommonModule, InputIcon,IconField,FormsModule,InputTextModule],
  templateUrl: './search-bar-component.html',
  styleUrl: './search-bar-component.css'
})
export class SearchBarComponent implements OnInit{

  constructor( private apiSer: ApiService, 
               private signalStore: SignalStore ){}

  ngOnInit(): void {
    this.readResume();
  }

  readResume(){
    this.apiSer.getResume('IPSA').subscribe(resp => {
      this.signalStore.resume.set(resp.data);
      //console.log(this.resume());
      console.log(resp)
    });
    
    
  }

}
