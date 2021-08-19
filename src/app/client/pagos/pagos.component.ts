import { Component, OnInit } from '@angular/core';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  faCaretLeft = faCaretLeft;

  carritoFinal: any = [];
  coordenadaFinal: any = {};
  totalProducto: number = 0;
  subtotal: number = 0;
  ISV: number = 0;
  comisionTotal: number = 0;
  total: number = 0;
  costoProducto: any = [];

  constructor() { }

  ngOnInit(): void {
    this.carritoFinal = JSON.parse(localStorage.getItem('carrito')!);
    this.coordenadaFinal = JSON.parse(localStorage.getItem('coordenadas')!);
    console.log(this.carritoFinal);
    console.log(this.coordenadaFinal);

    this.calcularCostoDeCadaProducto();
    this.subtotal = Number(this.calcularSubtotal(this.costoProducto, 'costo'));
    this.ISV = this.subtotal * 0.15;
    this.total = this.subtotal + this.ISV + this.comisionTotal
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

}
