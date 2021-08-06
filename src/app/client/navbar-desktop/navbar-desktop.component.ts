import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faBars, faHome, faUserEdit, faBox, faClipboardList, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
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

  @Output() onNewSettings: EventEmitter<boolean> = new EventEmitter();

  faBars = faBars;
  faShoppingCart = faShoppingCart;
  faSearch = faSearch;
  faHome = faHome;
  faUserEdit = faUserEdit;
  faBox = faBox;
  faClipboardList = faClipboardList;
  faSignOutAlt = faSignOutAlt;

  mostrar: boolean = false;
  mostrarSettings: boolean = false;

  mostrarHome: boolean = false;
  mostrarEditarPerfil: boolean = false;
  mostrarPedidoActual: boolean = false;
  mostrarHistorialPedidos: boolean = false;


  constructor(
    private clientesService: ClientesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  show() {
    return this.mostrar = !this.mostrar;
  }

  showSettings() {
    this.mostrarSettings = !this.mostrarSettings;
  }

  showEditarPerfil() {
    this.onNewSettings.emit(false);
    this.mostrarPedidoActual = false;
    this.mostrarHistorialPedidos = false;
    this.mostrarHome = false;
    return this.mostrarEditarPerfil = true;
  }

  showPedidoActual() {
    this.onNewSettings.emit(false);
    this.mostrarEditarPerfil = false;
    this.mostrarHistorialPedidos = false;
    this.mostrarHome = false;
    return this.mostrarPedidoActual = true;
  }

  showHistorialPedidos() {
    this.onNewSettings.emit(false);
    this.mostrarEditarPerfil = false;
    this.mostrarPedidoActual = false;
    this.mostrarHome = false;
    return this.mostrarHistorialPedidos = true;
  }

  showHome() {
    this.onNewSettings.emit(true);
    this.mostrarEditarPerfil = false;
    this.mostrarPedidoActual = false;
    this.mostrarHistorialPedidos = false;
    return this.mostrarHome = false;
  }

  logout() {
    this.router.navigateByUrl('');
    this.clientesService.logout()
  }

}
