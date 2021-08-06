import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClientesService } from './services/clientes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanLoad {
  constructor (
    private clientService: ClientesService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.clientService.validarTokenCliente()
      .pipe(
        tap( valid => {
          if ( !valid ) {
            this.router.navigateByUrl('');
          }
        })
      );
  }

  canLoad(): Observable<boolean> | boolean {
    return this.clientService.validarTokenCliente()
      .pipe(
        tap( valid => {
          if ( !valid ) {
            this.router.navigateByUrl('');
          }
        })
      );
  }

}
