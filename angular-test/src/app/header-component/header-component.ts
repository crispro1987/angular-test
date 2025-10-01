import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { SignalStore } from '../shared/services/signal-store';

@Component({
  selector: 'app-header-component',
  imports: [CommonModule,DividerModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent {

  constructor( public signalStore: SignalStore ){}

}
