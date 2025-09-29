import { Component, signal } from '@angular/core';
import { ChartComponent } from './chart-component/chart-component';
import { HeaderComponent } from './header-component/header-component';
import { SearchBarComponent } from './search-bar-component/search-bar-component';
import { TabComponent } from './tab-component/tab-component';
import { SummaryComponent } from './summary-component/summary-component';

@Component({
  selector: 'app-root',
  imports: [ChartComponent,HeaderComponent,SearchBarComponent,TabComponent,SummaryComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-test');
}
