import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { SignalStore } from '../shared/services/signal-store';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-tab-component',
  imports: [CommonModule,TabsModule,TableModule],
  templateUrl: './tab-component.html',
  styleUrl: './tab-component.css'
})
export class TabComponent implements OnInit {

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

}
