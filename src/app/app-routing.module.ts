import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AuthenticationGuard } from './authentication.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
    canActivate: [AuthenticationGuard],
    canLoad: [ AuthenticationGuard ]
  },
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'error',
    component: ErrorPageComponent,
  },
  {
    path: '**',
    redirectTo: 'error',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
