import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url = 'http://localhost:3000/productos';

  constructor(
    private httpClient: HttpClient
  ) { }

  obtenerProductosPorEmpresa(codigo: string): Observable<any> {
    return this.httpClient.get(`${this.url}/prods/${codigo}`);
  }



}
