import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart-component';
import { SignalStore } from '../shared/services/signal-store';


class SignalStoreStub {
  history = jasmine.createSpy('history').and.returnValue({
    chart: [] 
  });
}

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let signalStore: SignalStoreStub;

  const BASE_CHART = [
    { datetimeLastPrice: '29-09-2025 10:00', lastPrice: 100 },
    { datetimeLastPrice: '30-09-2025 10:00', lastPrice: 110 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent],
      providers: [
        { provide: SignalStore, useClass: SignalStoreStub }
      ]
    })

    .overrideComponent(ChartComponent, {
      set: { template: '<div></div>' },
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;

    signalStore = TestBed.inject(SignalStore) as unknown as SignalStoreStub;


    signalStore.history.and.returnValue({ chart: BASE_CHART });
    
    fixture.detectChanges();
  });

  it('creación de componente', () => {
    expect(component).toBeTruthy();
  });

  

  it('refreshData debe armar para el grafico this.data con labels y datasets desde un array', () => {
 
    component.refreshData(BASE_CHART); 

    expect(component.data).toBeTruthy();
    expect(component.data.labels).toEqual(
      BASE_CHART.map(d => d.datetimeLastPrice)
    );
    expect(component.data.datasets[0].data).toEqual(
      BASE_CHART.map(d => d.lastPrice)
    );
  });

  
  
});
