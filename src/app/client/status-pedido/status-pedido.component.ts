import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-status-pedido',
  templateUrl: './status-pedido.component.html',
  styleUrls: ['./status-pedido.component.css']
})
export class StatusPedidoComponent implements OnInit, OnDestroy {

  @Input() orden: any;
  map: mapboxgl.Map | any;
  mapbox = ( mapboxgl as typeof mapboxgl );
  center: [number, number] = [-87.2005121933671, 14.071417406575236];
  lugares: any = [];
  orderMap: any;
  mensajeSuscripcion: Subscription | undefined;
  conversor: any = [];

  constructor( private ordenServicio: OrdenesService ) { }

  ngOnInit(): void {

    this.ordenServicio.getEstado().subscribe( res=>{
      this.conversor = res;
      this.orderMap = this.conversor[0];
    },
    error =>{
      console.log(error);
    })    

    this.orderMap = this.orden;
    this.lugares.push(this.orderMap.destinoMapa);
    console.log(this.orderMap);
    this.createMap();
  }

  ngOnDestroy() {
    this.mensajeSuscripcion?.unsubscribe();
  }

  createMap() {
    this.mapbox.accessToken = 'pk.eyJ1IjoiamRmaWFsbG9zIiwiYSI6ImNrc2I5ZDdiYjA0anIybmxjejhmcnFpYzkifQ.aMOlY6Y1vrkeu18LtqBZ_Q';
    
    this.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: this.center,
    zoom: 10
    });

    for (let marcador of this.lugares) {
      this.addMarker( marcador );
    }  

  }


    //El marcador se crea al leer el cliente y al nosotros ponerlo como motorista, solo al inicio
    addMarker( marcador: any) {

      const html = `<h5 style="padding-top: 10px;">${marcador.nombre}</h5>`;
  
        const customPopup = new mapboxgl.Popup({
          offset: 25,
          closeOnClick: false
        }).setHTML( html );
    
        const marker = new mapboxgl.Marker({
          draggable: true,
          color: marcador.color
        })
        .setLngLat([marcador.lng, marcador.lat])
        .setPopup( customPopup )
        .addTo( this.map );
    
        marker.on('drag', () =>{
          const lngLat = marker.getLngLat();
          console.log(lngLat);
        });
  
    }

}
