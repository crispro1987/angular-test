import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SignalStore } from '../shared/services/signal-store';

@Component({
  selector: 'app-instrument-list-component',
  imports: [CommonModule,TableModule],
  templateUrl: './instrument-list-component.html',
  styleUrl: './instrument-list-component.css'
})
export class InstrumentListComponent implements OnInit {

  public dataTable1: any;
  public dataTable2: any;

  constructor( public signalStore: SignalStore ){
    this.readDataTable()
  }

  ngOnInit(): void {
    
  }

  readDataTable(){
    effect(() => {
      const r = this.signalStore.constituents();
      if (r) {
       
        const fifty = Math.ceil(r.constituents.length / 2);

        const mapped = r.constituents.map((d: any) => ({
          codeInstrument: d.codeInstrument,
          lastPrice: d.lastPrice,
          pctDay: d.pctDay,
          pct30D: d.pct30D,
          pctCY: d.pctCY,
          pct1Y: d.pct1Y
        }));

        this.dataTable1 = mapped.slice(0, fifty);
        this.dataTable2 = mapped.slice(fifty);
      }
    });
  }

  changeInstrument(instrumento:string){
    this.signalStore.globalInstrument.set(instrumento);
    window.scrollTo({top:0, left:0,behavior: 'smooth'});
  }


}
