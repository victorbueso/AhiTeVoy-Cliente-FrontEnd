import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private url = "http://localhost:3000/categoria";

  constructor(
    private httpClient: HttpClient,
  ) { }

  getCategories(): Observable<any> {
    return this.httpClient.get(`${this.url}/`);
  }
}
