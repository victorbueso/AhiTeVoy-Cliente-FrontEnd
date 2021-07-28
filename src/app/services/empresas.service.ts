import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private url = 'http://localhost:3000/empresas'

  constructor(
    public httpClient: HttpClient,
  ) { }

  obtenerEmpresasPorCategoria(codigo: string): Observable<any> {
    return this.httpClient.get(`${this.url}/cats/${codigo}`);
  }
}
