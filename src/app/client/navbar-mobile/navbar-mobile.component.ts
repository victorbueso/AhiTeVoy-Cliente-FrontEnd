import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faBars, faBox, faShoppingCart, faUserEdit, faClipboardList, faQuestionCircle, faSignOutAlt, faTimes, faSearch, faHome } from '@fortawesome/free-solid-svg-icons';
import { ClientesService } from '../../services/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.css']
})
export class NavbarMobileComponent implements OnInit {

  @Input() mostrarMapa: any;
  @Output() ocultarMapa: EventEmitter<boolean> = new EventEmitter;
  @Output() ocultarOpciones: EventEmitter<boolean> = new EventEmitter;
  @Output() onNewComponente: EventEmitter<boolean> = new EventEmitter;

  usuario = this.clientesService.usuario;
  nombreClient: string = '';
  apellidoClient: string = '';
  correoClient: string = '';

  faBars = faBars;
  faTimes = faTimes;
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faUserEdit = faUserEdit;
  faBox = faBox;
  faClipboardList = faClipboardList;
  faQuestionCircle = faQuestionCircle;
  faSignOutAlt = faSignOutAlt;
  faHome = faHome;


  public mostrar: boolean = false;
  public mostrarEditarPerfil: boolean = false;
  public mostrarPedidoActual: boolean = false;
  public mostrarHistorialPedidos: boolean = false;
  public mostrarAyuda: boolean = false;                 //mostrarHome*

  constructor(
    private clientesService: ClientesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.clientesService.obtenerUsuarioActual(this.usuario)
    .subscribe((result: any) => {
      this.nombreClient = result.nombre;
      this.apellidoClient = result.apellido;
      this.correoClient = result.correo;
    }, (error: any) => console.log(error))
  }

  show() {
    return this.mostrar = !this.mostrar;
  }

  showEditarPerfil() {
    this.onNewComponente.emit(false);
    this.mostrarPedidoActual = false;
    this.mostrarHistorialPedidos = false;
    this.mostrarAyuda = false;
    this.ocultarMapa.emit(false);
    this.ocultarOpciones.emit(false);
    return this.mostrarEditarPerfil = true;
  }

  showPedidoActual() {
    this.onNewComponente.emit(false);
    this.mostrarEditarPerfil = false;
    this.mostrarHistorialPedidos = false;
    this.mostrarAyuda = false;
    this.ocultarMapa.emit(false);
    this.ocultarOpciones.emit(false);
    return this.mostrarPedidoActual = true;
  }

  showHistorialPedidos() {
    this.onNewComponente.emit(false);
    this.mostrarEditarPerfil = false;
    this.mostrarPedidoActual = false;
    this.mostrarAyuda = false;
    this.ocultarMapa.emit(false);
    this.ocultarOpciones.emit(false);
    return this.mostrarHistorialPedidos = true;
  }

  showHome() {
    this.onNewComponente.emit(true);
    this.mostrarEditarPerfil = false;
    this.mostrarPedidoActual = false;
    this.mostrarHistorialPedidos = false;
    this.ocultarMapa.emit(false);
    this.ocultarOpciones.emit(false);
    return this.mostrarAyuda = false;
  }

  logout() {
    this.router.navigateByUrl('');
    localStorage.removeItem('tokenCliente');
  }

}
