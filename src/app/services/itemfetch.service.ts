import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemfetchService {
  private jsonUrl="/items.json";
  constructor(private http: HttpClient) {}

  getItems(): Observable<any[]>{
    return this.http.get<any[]>(this.jsonUrl);
  }  
  
}
