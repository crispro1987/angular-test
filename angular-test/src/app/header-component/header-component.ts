import { Component, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ApiService } from '../shared/services/api-service';

@Component({
  selector: 'app-header-component',
  imports: [DividerModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent implements OnInit {

  public history: any;

  constructor( private apiSer: ApiService ){}

  ngOnInit(): void {
    /*this.read();*/
  }

  read(){
    this.apiSer.getValores().subscribe(resp => {
      this.history = resp
      console.log(this.history)
    });
    
    
  }

}
