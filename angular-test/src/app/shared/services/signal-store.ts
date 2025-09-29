import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalStore {

   public resume = signal<any>(null);

  setResume(data: any) {
    this.resume.set(data);
  }
  
}
