import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root'
  })
  export class SocketService {

    public socketStatus: boolean = false;
    
    constructor( private socket: Socket ) { 
        this.checkStatus();
    }

    /* Corrobora si el servidor del lado del backend esta conectado */
    checkStatus() {
        this.socket.on('connect', () => {
            this.emit('ordenes-conectar', 'motorista-ordenes');
            console.log('Conectado al servidor');
            this.socketStatus = true;
        })
        this.socket.on('disconnect', () => {
            console.log('Desonectado al servidor');
            this.socketStatus = false;
        }); 
    }

    //Servicio general para emit
    emit( evento: string, payload?: any, callback?: Function ) {
        console.log('Emitiendo', evento);
        //emit('Evento', payload, callback)
        this.socket.emit( evento, payload,  callback );
    }

    //Servicio general para listen
    listen( evento: string ) {
        return this.socket.fromEvent( evento );
    }

  }
