import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { HomeComponent } from './home/home.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';
import { NavbarDesktopComponent } from './navbar-desktop/navbar-desktop.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { HistorialPedidosComponent } from './historial-pedidos/historial-pedidos.component';
import { PedidoActualComponent } from './pedido-actual/pedido-actual.component';
import { VerEmpresasComponent } from './ver-empresas/ver-empresas.component';
import { VerProductosComponent } from './ver-productos/ver-productos.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { CoordenadasComponent } from './coordenadas/coordenadas.component';
import { PagosComponent } from './pagos/pagos.component';
import { StatusPedidoComponent } from './status-pedido/status-pedido.component';

import { SocketService } from '../services/socket.service';
import { OrdenesService } from '../services/ordenes.service';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    HomeComponent,
    NavbarMobileComponent,
    NavbarDesktopComponent,
    EditarPerfilComponent,
    HistorialPedidosComponent,
    PedidoActualComponent,
    VerEmpresasComponent,
    VerProductosComponent,
    AyudaComponent,
    CoordenadasComponent,
    PagosComponent,
    StatusPedidoComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    SocketService,
    OrdenesService
  ]
})
export class ClientModule { }
