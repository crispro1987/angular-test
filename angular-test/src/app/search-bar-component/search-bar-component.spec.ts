import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar-component';
import { ApiService } from '../shared/services/api-service';
import { SignalStore } from '../shared/services/signal-store';
import { of } from 'rxjs';


class ApiServiceStub {

  getResume = jasmine.createSpy().and.returnValue(of({ data: { foo: 'resume' } }));
  getHistory = jasmine.createSpy().and.returnValue(of({ data: { chart: [] } }));
  getConstituents = jasmine.createSpy().and.returnValue(
    of({ data: { constituents: [{ codeInstrument: 'ABC' }, { codeInstrument: 'XYZ' }] } })
  );
}

class SignalStoreStub {
  resume = { set: jasmine.createSpy('resume.set') };
  history = { set: jasmine.createSpy('history.set') };
  constituents = { set: jasmine.createSpy('constituents.set') };

  globalInstrument = jasmine.createSpy().and.returnValue('TEST'); 
}


describe('SearchBarComponent', () => {
  let fixture: ComponentFixture<SearchBarComponent>;
  let component: SearchBarComponent;
  let apiService: ApiServiceStub;
  let signalStore: SignalStoreStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent],
      providers: [
        { provide: ApiService, useClass: ApiServiceStub },
        { provide: SignalStore, useClass: SignalStoreStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;

    apiService = TestBed.inject(ApiService) as any;
    signalStore = TestBed.inject(SignalStore) as any;

    fixture.detectChanges();
  });

  it('creación de componente', () => {
    expect(component).toBeTruthy();
  });

  it('readResume debe actualizar signalStore cuando la API tenga éxito', () => {

    component.readResume('ABC');
    expect(apiService.getResume).toHaveBeenCalledWith('ABC');

    expect(signalStore.resume.set).toHaveBeenCalledWith({ foo: 'resume' });

    expect(signalStore.history.set).toHaveBeenCalledWith({ chart: [] });

    expect(signalStore.constituents.set).toHaveBeenCalledWith({ constituents: jasmine.any(Array) });
    expect(component.constituents.length).toBeGreaterThan(0);
  });

  it('La búsqueda debe filtrar los constituyentes', () => {

    component.constituents = [
      { codeInstrument: 'ABC' },
      { codeInstrument: 'XYZ' }
    ];

    component.search({ query: 'ab', originalEvent: {} as Event });

    expect(component.items).toContain('ABC');
    expect(component.items).not.toContain('XYZ');
  });

  it('send debe llamar a readResume con evento.valor', () => {

    spyOn(component, 'readResume');

    component.send({ value: 'ZZZ' });

    expect(component.readResume).toHaveBeenCalledWith('ZZZ');
  });
});