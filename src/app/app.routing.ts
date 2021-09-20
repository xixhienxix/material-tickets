import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthRegisterComponent } from './components/auth/auth.register.component';
import { AuthGuard } from './components/auth/_guards/auth.guard';
import { TicketsTableComponent } from './components/tickets-table/tickets-table.component';

const routes: Routes =[
  // {
  //   path:'tickets',
  //   component:TicketsTableComponent,
  //   canActivate:[AuthGuard]
  // },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  }, 
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate:[AuthGuard],
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
    
  },
  // {
  //   path:'',
  //   component:AuthComponent
  // },
  {
    path:'auth',
    component:AuthComponent
  }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
