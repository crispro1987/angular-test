import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { ApiService } from '../shared/services/api-service';
import { SignalStore } from '../shared/services/signal-store';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
  selector: 'app-search-bar-component',
  imports: [CommonModule, InputIcon,IconField,FormsModule,InputTextModule,AutoCompleteModule,ToastModule],
  providers: [MessageService],
  templateUrl: './search-bar-component.html',
  styleUrl: './search-bar-component.css'
})
export class SearchBarComponent implements OnInit{

  public items: any[] = [];
  public value: any;
  public constituents: any[] = [];

  constructor( private apiSer: ApiService, 
               private signalStore: SignalStore,
               private messageService: MessageService ){
                effect(() => {
                  this.readResume(signalStore.globalInstrument()) 
                });
               }

  ngOnInit(): void {
    this.readResume(this.signalStore.globalInstrument());
  }

  readResume(instrumento:string){
    this.apiSer.getResume(instrumento).subscribe(resp => {
      this.signalStore.resume.set(resp.data);

      this.apiSer.getHistory(instrumento).subscribe(resp2 => {
        this.signalStore.history.set(resp2.data)

        this.apiSer.getConstituents().subscribe(resp3 => {
          this.signalStore.constituents.set(resp3.data)
          this.constituents = resp3.data.constituents;
        })
      })
    },
    (error)=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `El instrumento ${instrumento} no presenta datos` });
    });
  }

  search(event: AutoCompleteCompleteEvent) {
    this.items = []; 
    const query = event.query.toLowerCase();
    this.constituents.filter(item => {
      if( item.codeInstrument.toLowerCase().includes(query) ){
        this.items.push(item.codeInstrument);
      }
    }) 
  }

  send(event:any){
    this.readResume(event.value);
  }


}

