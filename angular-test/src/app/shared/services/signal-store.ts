import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalStore {

  public resume = signal<any>(null);
  public history = signal<any>(null);
  public constituents = signal<any>(null);

  setResume(data: any) {
    this.resume.set(data);
  }

  setHistory(data: any){
    this.history.set(data)
  }

  setConstituents(data: any){
    this.constituents.set(data)
  }
  
}
