import { Component, effect, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { SignalStore } from '../shared/services/signal-store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import moment from 'moment';

@Component({
  selector: 'app-chart-component',
  imports: [CommonModule,ChartModule,FormsModule,SelectButtonModule],
  templateUrl: './chart-component.html',
  styleUrl: './chart-component.css'
})
export class ChartComponent implements OnInit {

  public data: any;
  public options: any;
  public ranges = [
    { label: '1D', value: '1D' },
    { label: '1S', value: '1S' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '6M', value: '6M' },
    { label: '1A', value: '1A' },
    { label: '5A', value: '5A' }
  ];
  
  public selectedRange = '1D';

  constructor( public signalStore: SignalStore ){
    this.dataChart();
  }

  ngOnInit(): void {}

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
      if(r){
        this.view()
      }
      
    });
  } 

  view(){
    if(this.selectedRange != null){
      const r = this.signalStore.history()

      const lastDate = moment.max(r.chart.map((d:any) => moment(d.datetimeLastPrice,'DD-MM-YYYY HH:ss')));

      switch (this.selectedRange){
        case '1D':
          let filterDay = r.chart.filter((d:any) => moment(d.datetimeLastPrice,'DD-MM-YYYY HH:ss').isSame(lastDate))

          if (filterDay.length === 1) {
              const only = filterDay[0];
              filterDay = [
                only,
                {
                  ...only,
                  datetimeLastPrice: moment(only.datetimeLastPrice, 'DD-MM-YYYY HH:mm')
                    .add(1, 'minutes')
                    .format('DD-MM-YYYY HH:mm')
                }
              ];
            }

            this.refreshData(filterDay);
          break;

        case '1S':
          const startWeek = moment(lastDate).subtract(7, 'days');
          const filterWeek = r.chart.filter((d: any) =>
            moment(d.datetimeLastPrice, 'DD-MM-YYYY HH:mm')
              .isBetween(startWeek, lastDate, 'day', '[]')
          );
          this.refreshData(filterWeek)
          break;
        
        case '1M':
          const startDate = moment(lastDate).subtract(1, 'months');
          const filterMonth = r.chart.filter((d: any) =>
            moment(d.datetimeLastPrice, 'DD-MM-YYYY HH:mm')
              .isBetween(startDate, lastDate, 'day', '[]')
          );
          this.refreshData(filterMonth)
          break;

        case '3M':
          const start3M = moment(lastDate).subtract(3, 'months');
          const filter3M = r.chart.filter((d: any) =>
            moment(d.datetimeLastPrice, 'DD-MM-YYYY HH:mm')
              .isBetween(start3M, lastDate, 'day', '[]')
          );
          this.refreshData(filter3M)
          break;

        case '6M':
          const start6M = moment(lastDate).subtract(6, 'months');
          const filter6M = r.chart.filter((d: any) =>
            moment(d.datetimeLastPrice, 'DD-MM-YYYY HH:mm')
              .isBetween(start6M, lastDate, 'day', '[]')
          );
          this.refreshData(filter6M)
          break;

        case '1A':
          const start1Y = moment(lastDate).subtract(1, 'years');
          const filter1Y = r.chart.filter((d: any) =>
            moment(d.datetimeLastPrice, 'DD-MM-YYYY HH:mm')
              .isBetween(start1Y, lastDate, 'day', '[]')
          );
          this.refreshData(filter1Y)
          break;

        case '5A':
          const start5Y = moment(lastDate).subtract(5, 'years');
          const filter5Y = r.chart.filter((d: any) =>
            moment(d.datetimeLastPrice, 'DD-MM-YYYY HH:mm')
              .isBetween(start5Y, lastDate, 'day', '[]')
          );
          this.refreshData(filter5Y)
          break;

      }
    }
  }

  refreshData(r:any){
    if (r) {
      this.data = {
        labels: r.map((d: any) => d.datetimeLastPrice),
        datasets: [
          {
            label: 'IPSA',
            data: r.map((d: any) => d.lastPrice),
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66,165,245,0.2)',
            fill: true,
            tension: 0.4,
            pointRadius: 0
          }
        ]
      };
    }
  }

}


