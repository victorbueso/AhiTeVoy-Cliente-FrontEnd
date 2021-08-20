import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faBars, faHome, faUserEdit, faBox, faClipboardList, faSignOutAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ClientesService } from '../../services/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-desktop',
  templateUrl: './navbar-desktop.component.html',
  styleUrls: ['./navbar-desktop.component.css']
})
export class NavbarDesktopComponent implements OnInit {

  @Input() actualizarCarrito: Array<any> = [];
  @Output() onNewSettings: EventEmitter<boolean> = new EventEmitter();
  @Output() onEmptyCart: EventEmitter<boolean> = new EventEmitter();

  faBars = faBars;
  faShoppingCart = faShoppingCart;
  faSearch = faSearch;
  faHome = faHome;
  faUserEdit = faUserEdit;
  faBox = faBox;
  faClipboardList = faClipboardList;
  faSignOutAlt = faSignOutAlt;
  faTrashAlt = faTrashAlt;

  //mostrar: boolean = false;
  mostrarSettings: boolean = false;
  mostrarCarrito: boolean = false;
  empty: boolean = false;
  botonPago: boolean = false;

  carrito: Array<any> = [];
  carritoActual: any = {};

  mostrarHome: boolean = false;
  mostrarEditarPerfil: boolean = false;
  mostrarPedidoActual: boolean = false;
  mostrarHistorialPedidos: boolean = false;
  @Input() mostrarMapa: any;
  @Output() ocultarMapa: EventEmitter<boolean> = new EventEmitter;
  @Output() ocultarPago: EventEmitter<boolean> = new EventEmitter;

  constructor(
    private clientesService: ClientesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('carrito')!).length == 0 || JSON.parse(localStorage.getItem('carrito')!) == null)
      this.onEmptyCart.emit(false)
    else
      this.onEmptyCart.emit(true);
  }

  /*show() {
    return this.mostrar = !this.mostrar;
  }*/

  showSettings() {
    this.mostrarSettings = !this.mostrarSettings;
  }

  showCarrito() {
    this.mostrarCarrito = !this.mostrarCarrito;
  }

  showEditarPerfil() {
    this.onNewSettings.emit(false);
    this.mostrarPedidoActual = false;
    this.mostrarHistorialPedidos = false;
    this.mostrarHome = false;
    this.ocultarMapa.emit(false);
    this.ocultarPago.emit(false);
    return this.mostrarEditarPerfil = true;
  }

  showPedidoActual() {
    this.onNewSettings.emit(false);
    this.mostrarEditarPerfil = false;
    this.mostrarHistorialPedidos = false;
    this.mostrarHome = false;
    this.ocultarMapa.emit(false);
    this.ocultarPago.emit(false);
    return this.mostrarPedidoActual = true;
  }

  showHistorialPedidos() {
    this.onNewSettings.emit(false);
    this.mostrarEditarPerfil = false;
    this.mostrarPedidoActual = false;
    this.mostrarHome = false;
    this.ocultarMapa.emit(false);
    this.ocultarPago.emit(false);
    return this.mostrarHistorialPedidos = true;
  }

  showHome() {
    this.onNewSettings.emit(true);
    this.mostrarEditarPerfil = false;
    this.mostrarPedidoActual = false;
    this.mostrarHistorialPedidos = false;
    this.ocultarMapa.emit(false);
    this.ocultarPago.emit(false);
    return this.mostrarHome = true;
  }

  logout() {
    this.router.navigateByUrl('');
    this.clientesService.logout()
  }

  obtenerCarrito() {
    this.carrito = JSON.parse(localStorage.getItem('carrito')!);
    console.log(this.carrito);
  }

  borrarCarrito(id: any) {
    this.actualizarCarrito = JSON.parse(localStorage.getItem('carrito')!);
    this.actualizarCarrito.splice(id, 1);
    //this.verificarCarrito();
    if (this.actualizarCarrito.length == 0) {
      this.botonPago = false;
      console.log(this.botonPago);
      this.onEmptyCart.emit(false);
      localStorage.setItem('carrito', JSON.stringify(this.actualizarCarrito));
    } else {
      this.botonPago = true;
      //console.log(this.actualizarCarrito)
      console.log(this.botonPago);
      localStorage.setItem('carrito', JSON.stringify(this.actualizarCarrito));
    }

  }

  vaciarCarrito() {
    if (this.actualizarCarrito == null) {
      this.empty = false;
      this.botonPago = false;
      this.onEmptyCart.emit(false);
    } else {
      this.empty = false;
      this.botonPago = false;
      this.onEmptyCart.emit(false);
      this.actualizarCarrito = [];
      localStorage.setItem('carrito', JSON.stringify(this.actualizarCarrito));
    }
  }

  verificarCarrito() {
    if (localStorage.getItem('carrito') == null) {
      this.botonPago = false;
      this.onEmptyCart.emit(false);
    } else {
      this.botonPago = true;
      this.onEmptyCart.emit(true);
    }
  }

}
