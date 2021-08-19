import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-coordenadas',
  templateUrl: './coordenadas.component.html',
  styleUrls: ['./coordenadas.component.css']
})
export class CoordenadasComponent implements OnInit {

  faCaretLeft = faCaretLeft;

  map: mapboxgl.Map | any;
  coordenadas: any;
  @Input() mostrarPagos: any;
  @Output() mostrarPago: EventEmitter<boolean> = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapboxKey;
    this.map = new mapboxgl.Map({
      container: 'mapa-mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-87.1658053, 14.0856818],
      zoom: 14
    });

    this.createMarker(-87.1658053, 14.0856818);
  }

  createMarker(lng: number, lat: number) {
    const popup = new mapboxgl.Popup({
      offset: 25
    })
    .setHTML('<h5>Ubicación destino:</h5><p>La orden se enviará a este lugar</p>')

    const marker = new mapboxgl.Marker({
      draggable: true,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    })
    .setLngLat([lng, lat])
    .setPopup(popup)
    .addTo(this.map);

    marker.on('dragend', () => {
      this.coordenadas = marker.getLngLat();
      console.log(this.coordenadas);
    })
  }

  guardarCoordenadas() {
    localStorage.setItem('coordenadas', JSON.stringify(this.coordenadas));
    console.log(this.mostrarPagos);
    this.mostrarPago.emit(!this.mostrarPagos);
  }

}
