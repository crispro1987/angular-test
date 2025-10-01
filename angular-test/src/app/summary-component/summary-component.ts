import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { SignalStore } from '../shared/services/signal-store';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-summary-component',
  imports: [CommonModule,TabsModule,DividerModule],
  templateUrl: './summary-component.html',
  styleUrl: './summary-component.css'
})
export class SummaryComponent {

  constructor( public signalStore: SignalStore ) {}
  
}
