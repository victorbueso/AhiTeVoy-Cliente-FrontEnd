import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faBars, faBox, faShoppingCart, faUserEdit, faClipboardList, faQuestionCircle, faSignOutAlt, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.css']
})
export class NavbarMobileComponent implements OnInit {
  faBars = faBars;
  faTimes = faTimes;
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faUserEdit = faUserEdit;
  faBox = faBox;
  faClipboardList = faClipboardList;
  faQuestionCircle = faQuestionCircle;
  faSignOutAlt = faSignOutAlt;


  public mostrar: boolean = false;
  public mostrarEditarPerfil: boolean = false;
  public mostrarPedidoActual: boolean = false;
  public mostrarHistorialPedidos: boolean = false;
  public mostrarAyuda: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  show() {
    return this.mostrar = !this.mostrar;
  }

  showEditarPerfil() {
    this.mostrarPedidoActual = false;
    this.mostrarHistorialPedidos = false;
    this.mostrarAyuda = false;
    return this.mostrarEditarPerfil = !this.mostrarEditarPerfil;
  }

  showPedidoActual() {
    this.mostrarEditarPerfil = false;
    this.mostrarHistorialPedidos = false;
    this.mostrarAyuda = false;
    return this.mostrarPedidoActual = !this.mostrarPedidoActual;
  }

  showHistorialPedidos() {
    this.mostrarEditarPerfil = false;
    this.mostrarPedidoActual = false;
    this.mostrarAyuda = false;
    return this.mostrarHistorialPedidos = !this.mostrarHistorialPedidos;
  }

  showAyuda() {
    this.mostrarEditarPerfil = false;
    this.mostrarPedidoActual = false;
    this.mostrarHistorialPedidos = false;
    return this.mostrarAyuda = !this.mostrarAyuda;
  }

}
