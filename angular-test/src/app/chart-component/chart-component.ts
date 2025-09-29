import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-chart-component',
  imports: [ChartModule],
  templateUrl: './chart-component.html',
  styleUrl: './chart-component.css'
})
export class ChartComponent implements OnInit {

  public data: any;
  public options: any;

  cosntructor(){}

  ngOnInit(): void {
    
    this.data = {
      labels: ['09:00', '10:00', '11:00', '12:00', '13:00'],
      datasets: [
        {
          label: 'IPSA',
          data: [6520, 6510, 6500, 6495, 6480],
          fill: true,  // activa el área
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66, 165, 245, 0.2)',
          tension: 0.4,  // suaviza la línea
          pointRadius: 0 // oculta los círculos de cada punto
        }
      ]
    };

    this.options = {
      plugins: {
        legend: { display: false } // oculta la leyenda si no la quieres
      },
      scales: {
        x: {
          ticks: { color: '#E0E0E0' },
          grid: { color: 'rgba(255,255,255,0.1)' }
        },
        y: {
          ticks: { color: '#E0E0E0' },
          grid: { color: 'rgba(255,255,255,0.1)' }
        }
      }
    };
  }

}
