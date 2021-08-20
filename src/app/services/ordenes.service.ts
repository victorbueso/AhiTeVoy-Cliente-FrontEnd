import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  private url = 'http://localhost:3000/ordenes'

  constructor(
    private httpClient: HttpClient,
    private socket: SocketService
  ) { }

  nuevaOrden(data: any): Observable<any> {
    return this.httpClient.post(`${this.url}/`, data)
  }



  //Emitimos el cambio a la bdd en tiempo real.
  ordenTomada( payload: any ) {
    console.log('Emitiendo', payload);
    this.socket.emit('ordenes', payload);
  }

  //Entramos a la sala de la orden, aqui hacemos el join a la sala.
  entraOrden( payload: any ) {
    console.log('Emitiendo', payload);
    this.socket.emit('estado-conectar', payload);
  }

  //Modificamos la orden
  updateOrden( payload: any ) {
    console.log('Emitiendo', payload);
    this.socket.emit('estado', payload);
  }

  //Escuchamos el estado de la orden
  getEstado() {
      return this.socket.listen('estado');
  }
  
  //Emitimos conexion al logear.
  loginWS( email: string ) {
    this.socket.emit('configurar-usuario', email, (resp: any) => {
        console.log(resp);
    });
  }

      //Servicio para escuchar los cambios en la bdd.
      getOrdenesNuevas() {
        return this.socket.listen('orden-tomada');
    }

  //Ejemplo para escuchar
      //Servicio para escuchar los cambios en la bdd.
/*     getOrdenesNuevas() {
        return this.socket.listen('orden-tomada');
    } */


}
