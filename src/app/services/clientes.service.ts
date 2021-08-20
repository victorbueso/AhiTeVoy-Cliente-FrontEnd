import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthResponse } from '../components/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private url = "http://localhost:3000/cliente";
  private user = {};

  get usuario() {
    return { ...this.user };
  }

  constructor(private httpClient: HttpClient) {}

  registrarUsuarioCliente(data: any): Observable<any> {
    return this.httpClient.post<AuthResponse>(`${this.url}/`, data)
    .pipe(
      tap( ({ ok, token }) => {
        if ( ok ) {
          localStorage.setItem('tokenCliente', token! );
        }
      }),
      map( resp => resp.ok ),
      catchError( err => of(err.error.msg) )
    );
  }

  loginUsuarioCliente(data: any): Observable<any>{
    return this.httpClient.post<AuthResponse>(`${this.url}/signin`, data)
    .pipe(
      tap( resp => {
        if ( resp.ok ) {
          localStorage.setItem('tokenCliente', resp.token! );
        }
      }),
      map( resp => resp.ok ),
      catchError( err => of(err.error.msg) )
    );
  }

  validarTokenCliente(): Observable<boolean> {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('tokenCliente') || '' );

    return this.httpClient.get<AuthResponse>(`${this.url}/renew`, { headers } )
        .pipe(
          map( resp => {
            localStorage.setItem('tokenCliente', resp.token! );
            this.user = {
              uid: resp.uid!,
              correo: resp.correo!
            }
            return resp.ok;
          }),
          catchError( err => of(false) )
        );
  }

  logout() {
    localStorage.removeItem('tokenCliente');
  }

  obtenerUsuarioActual(id: any): Observable<any> {
    return this.httpClient.get(`${this.url}/${id.uid}`);
  }

  actualizarCliente(id: any, data: any): Observable<any> {
    const fd = new FormData()
    fd.append('nombre', data.nombre)
    fd.append('apellido', data.apellido)
    fd.append('telefono', data.telefono)
    fd.append('direccion', data.direccion)
    fd.append('ciudad', data.ciudad)
    fd.append('departamento', data.departamento)
    fd.append('tarjetaCredito', data.tarjetaCredito)
    fd.append('vencimientoTarjeta', data.vencimientoTarjeta)
    fd.append('cvv', data.cvv)
    fd.append('imagen', data.imagen)
    return this.httpClient.put(`${this.url}/${id.uid}`, fd);
  }


  /*isClientLogged() {
    if (this.cookieService.get('_id'))
      return true
    return false
  }*/

}
