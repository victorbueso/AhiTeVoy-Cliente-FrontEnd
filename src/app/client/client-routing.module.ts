import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { ErrorPageComponent } from '../components/error-page/error-page.component';
import { HistorialPedidosComponent } from './historial-pedidos/historial-pedidos.component';
import { PedidoActualComponent } from './pedido-actual/pedido-actual.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { CoordenadasComponent } from './coordenadas/coordenadas.component';
import { PagosComponent } from './pagos/pagos.component';
import { StatusPedidoComponent } from './status-pedido/status-pedido.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'editar', component: EditarPerfilComponent },
      { path: 'pedido', component: PedidoActualComponent },
      { path: 'historial', component: HistorialPedidosComponent },
      { path: 'ayuda', component: AyudaComponent },
      { path: 'error', component: ErrorPageComponent },
      { path: 'map', component: CoordenadasComponent },
      { path: 'pay', component: PagosComponent },
      { path: 'status', component: StatusPedidoComponent },
      { path: '**', redirectTo: '' },
    ]
  },
  {
    path: '**',
    redirectTo: '',
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClientRoutingModule { }
