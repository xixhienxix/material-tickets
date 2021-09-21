import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'app/models/usuario';
import { PasswordComponent } from '../password/password/password.component';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/tickets', title: 'Tickets',  icon: 'content_paste', class: '' }
    // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    // { path: '/nuevo-ticket', title: 'Tickets',  icon:'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  usuario:Usuario;
  
  constructor(public router : Router,
    public modalService:NgbModal) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.usuario =  JSON.parse(localStorage.getItem('USUARIO'));
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  changePassword(){

    const modalRef = this.modalService.open(PasswordComponent,{size:'sm'})
    modalRef.componentInstance.usuario = JSON.parse(localStorage.getItem('USUARIO'))
    
  }

    cerrarSesion()
    {
        localStorage.removeItem('AREA')
        localStorage.removeItem('ROL')
        localStorage.removeItem('ACCESS_TOKEN')
        localStorage.removeItem('CURRENT_USER')
        localStorage.removeItem('EXPIRES_IN')
        localStorage.removeItem('EMAIL')

        this.router.navigate(['auth'])
        
    }
  }

