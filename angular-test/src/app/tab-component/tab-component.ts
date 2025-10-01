import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { InstrumentListComponent } from '../instrument-list-component/instrument-list-component';

@Component({
  selector: 'app-tab-component',
  imports: [CommonModule,TabsModule,TableModule,InstrumentListComponent],
  templateUrl: './tab-component.html',
  styleUrl: './tab-component.css'
})
export class TabComponent {
  constructor(){}
}
