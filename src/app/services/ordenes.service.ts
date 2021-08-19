import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  private url = 'http://localhost:3000/ordenes'

  constructor(
    private httpClient: HttpClient,
  ) { }

  nuevaOrden(data: any): Observable<any> {
    return this.httpClient.post(`${this.url}/`, data)
  }

}
