import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { Subscription } from 'rxjs';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  @ViewChild('mapElement') mapElement!: ElementRef;

  @Input() mostrarStatus: any;
  @Output() verStatus: EventEmitter<boolean> = new EventEmitter;

  changePagosStatus: boolean = false;
  map: mapboxgl.Map | any;
  mapbox = (mapboxgl as typeof mapboxgl)

  faCaretLeft = faCaretLeft;
  closeResult = ``;
  dateToday = new Date();
  successMessage = false;
  successfull = ``;

  carritoFinal: any = [];
  coordenadaFinal: any = {};
  totalProducto: number = 0;
  subtotal: number = 0;
  ISV: number = 0;
  comisionTotal: number = 0;
  total: number = 0;
  costoProducto: any = [];
  mensajeSuscripcion: Subscription | undefined;

  formPagos: FormGroup = this.fb.group({
    numeroTarjeta: [null, [Validators.required, Validators.minLength(4), Validators.pattern("^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|(?:4[0-9]{12}(?:[0-9]{3})?|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})|6(?:011|5[0-9]{2})[0-9]{12}$")]],
    fechaVencimiento: [null, [Validators.required, Validators.pattern("")]],
    cvv: [null, [Validators.required, Validators.pattern("^[0-9]{3,4}$")]],
    descripcion: [null, [Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]],
  })

  constructor(
    private modal: NgbModal,
    private fb: FormBuilder,
    private ordenesService: OrdenesService,
  ) { }

  open(content: any) {
    this.modal.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'md', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  limpiar() {
    this.formPagos.reset(this.formPagos);
  }

  get numeroTarjeta(){
    return this.formPagos.get('numeroTarjeta')?.invalid && this.formPagos.get('numeroTarjeta')?.touched;
  }

  get fechaVencimiento(){
    return this.formPagos.get('fechaVencimiento')?.invalid && this.formPagos.get('fechaVencimiento')?.touched;
  }

  get cvv(){
    return this.formPagos.get('cvv')?.invalid && this.formPagos.get('cvv')?.touched;
  }

  get descripcion(){
    return this.formPagos.get('descripcion')?.invalid && this.formPagos.get('descripcion')?.touched;
  }

  ngOnInit() {
    this.carritoFinal = JSON.parse(localStorage.getItem('carrito')!);
    this.coordenadaFinal = JSON.parse(localStorage.getItem('coordenadas')!);
    console.log(this.carritoFinal);
    console.log(this.coordenadaFinal);

    this.calcularCostoDeCadaProducto();
    this.subtotal = Number(this.calcularSubtotal(this.costoProducto, 'costo'));
    this.ISV = this.subtotal * 0.15;
    this.total = this.subtotal + this.ISV + this.comisionTotal;

  }
  


  calcularCostoDeCadaProducto() {
    let multiplicar;
    let comision = 0;
    for (let i=0; i<this.carritoFinal.length; i++) {
      multiplicar = this.carritoFinal[i].cantidad * this.carritoFinal[i].precio;
      comision += this.carritoFinal[i].comision
      this.costoProducto.push({
        producto: this.carritoFinal[i].nombreProducto,
        costo: multiplicar,
      });
    }
    console.log(this.costoProducto);
    this.comisionTotal = comision;
    console.log(this.comisionTotal);
  }

  calcularSubtotal(data: any, fn: any) {
    return data.map(typeof fn === 'function' ? fn : (d:any) => d[fn]).reduce((a:any, v:any) => a+v, 0);
  }

  SuccessfullMessage() {
    this.successMessage = true;
    this.successfull = `La transacción se ha realizado exitosamente. Su orden está en proceso.`;
    setTimeout(() => {
      this.successMessage = false;
      this.modal.dismissAll();
    }, 3000);
  }

  pagar() {
    let pedido = [];
    for (let i=0; i<this.carritoFinal.length; i++) {
      pedido.push({
        nombreProducto: this.carritoFinal[i].nombreProducto,
        precio: this.carritoFinal[i].precio,
        cantidad: this.carritoFinal[i].cantidad
      })
    }
    
    let data = {
      pedido: pedido,
      destinoMapa: this.coordenadaFinal,
      statusOrden: 0,
      tomada: false,
      entregada: false,
      descripcion: (<HTMLInputElement>document.querySelector('#inputDescripcion')).value,
    }

    //LLamamos al servicio para pagar
    this.ordenesService.nuevaOrden(data)
    .subscribe( result => {

      //Entramos a la sala
      this.ordenesService.entraOrden({nameRoom: result._id} )

      //Actualizamos a todos lo motoristas
      this.ordenesService.ordenTomada({nameRoom: 'Ordenes'});
      console.log(result);
      this.verStatus.emit(!this.mostrarStatus);
      this.changePagosStatus = true;
      localStorage.removeItem('carrito');
      localStorage.removeItem('coordenadas');
    }, error => {
      console.log(error);
    })

  }

  createMapa() {
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapboxKey;
    this.map = new mapboxgl.Map({
      container: 'map-mapbox',
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
      console.log(marker.getLngLat());
    })
  }

}
