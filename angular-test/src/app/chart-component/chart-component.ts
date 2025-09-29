import { Component, effect, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ApiService } from '../shared/services/api-service';
import { SignalStore } from '../shared/services/signal-store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart-component',
  imports: [CommonModule,ChartModule],
  templateUrl: './chart-component.html',
  styleUrl: './chart-component.css'
})
export class ChartComponent implements OnInit {

  public data: any;
  public options: any;

  constructor( private apiSer: ApiService, 
               public signalStore: SignalStore ){
                this.dataChart();
               }

  ngOnInit(): void {

  }


  dataChart(){
    this.options = {
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#E0E0E0' }, grid: { color: 'rgba(255,255,255,0.1)' } },
        y: { ticks: { color: '#E0E0E0' }, grid: { color: 'rgba(255,255,255,0.1)' } }
      }
    };

    effect(() => {
      const r = this.signalStore.history();
      if (r) {
        this.data = {
          labels: r.chart.map((d: any) => d.datetimeLastPrice),
          datasets: [
            {
              label: 'IPSA',
              data: r.chart.map((d: any) => d.lastPrice),
              borderColor: '#42A5F5',
              backgroundColor: 'rgba(66,165,245,0.2)',
              fill: true,
              tension: 0.4,
              pointRadius: 0
            }
          ]
        };
      }
    });
  }
  

}
