import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ClientRoutingModule } from './client-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';
import { NavbarDesktopComponent } from './navbar-desktop/navbar-desktop.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarMobileComponent,
    NavbarDesktopComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ClientModule { }
