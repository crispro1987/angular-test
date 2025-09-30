import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient ){}

  getResume(instrumento:string): Observable<any>{
    return  this.http.get(`resumen/${instrumento}.json`);
  }

  getHistory(instrumento:string): Observable<any>{
    return this.http.get(`history/history-${instrumento}.json`)
  }

  getConstituents(): Observable<any>{
    return this.http.get('constituyentes/constituensList.json')
  }
  
}
