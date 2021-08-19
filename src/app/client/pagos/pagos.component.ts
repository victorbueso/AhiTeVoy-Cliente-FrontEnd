import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit, OnDestroy {

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
    this.total = this.subtotal + this.ISV + this.comisionTotal

    this.mensajeSuscripcion = this.ordenesService.getOrdenesNuevas().subscribe( resp=>{
      console.log('conectamos')
    },
    error => {
      console.log(error);
    })    

  }
  

  ngOnDestroy() {
    this.mensajeSuscripcion?.unsubscribe();
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

      console.log(result);
    }, error => {
      console.log(error);
    })
  }

}
