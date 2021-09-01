import { Component, OnInit,ViewChild,ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../../environments/environment"
import { Tickets } from 'app/models/tickets';
import { Campanas } from '../../models/campana';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TicketService } from '../../../services/tickets.service';
import { CampanasService } from '../../../services/campanas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AreasService } from 'services/areas.service';
import { Areas } from 'app/models/areas';
import { UsuarioService } from 'services/usuario.service';
import { Usuario } from 'app/models/usuario';
import { DashboardComponent } from 'app/dashboard/dashboard.component';

@Component({
  selector: 'nuevos-tickets',
  templateUrl: './nuevos-tickets.component.html',
  styleUrls: ['./nuevos-tickets.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class NuevosTicketsComponent implements OnInit {
  public listaTickets:Tickets[];
  public listaAreas:Areas[];
  public listaUsuarios:Usuario[];
  public listaCampanas:Campanas[]=[];
  closeResult: string;
  usuario:Usuario;

  @ViewChild('exito') exito=null;

  constructor( private modalService: NgbModal,
    public areaService:AreasService,
    public usuarioservice:UsuarioService,
    public modal: NgbActiveModal,
    private http: HttpClient,
    public ticketService:TicketService,
    public campanaService:CampanasService,) { }

    ngOnInit() {
      this.getCampanas();
      this.getAreas();
      this.getUsuarios();
    }
  
    close(){
      this.modal.close();
    }
  
    getCampanas()
    {
      this.campanaService.getCampanas()
      .subscribe((response)=>{
        this.listaCampanas=response
      })
    }

    getAreas()
    {
      this.areaService.getAreas()
      .subscribe((response)=>{
        this.listaAreas=response
      })
    }

    getUsuarios()
    {
      this.usuarioservice.getUsuarios()
      .subscribe((response)=>{
        this.listaUsuarios=response
      })
    }
  
    guardaTicket(campana:string,responsable,descripcion)
    {
        var date = new Date();

        let estatus = 1 
        let fecha_inicio = date;
        // add a day
        var date4 =new Date();
        let fecha_fin= new Date(date4.setHours( date4.getHours() + 24 ));
    
        var date2=new Date();
    
        let fecha_seguimeinto = new Date (date2.setHours( date2.getHours() + 48 ));
    
        var date3= new Date();
    
        let hora_abierto = date3.getHours()+":"+date3.getMinutes()+":"+date3.getSeconds();
    
    
        let tickets: Tickets = {
          ID:1,
          Area:campana,
          Descripcion:descripcion,
          Responsable:responsable,
          Supervisado:'',
          Creado_Por:this.usuario.Nombre,
          Estatus:estatus,
          Fecha_Inicio:fecha_inicio,
          Fecha_Fin:fecha_fin,
          Fecha_Seguimeinto:fecha_seguimeinto,
          Hora_Abierto:hora_abierto,
          Color:"#21D864"
          };
          
          this.ticketService.postTickets(tickets)
          .subscribe(
          res => console.log('HTTP response', res),
          err => console.log('HTTP Error', err),
          () =>
          {            
            this.openMini(this.exito)
          })
      
    }
  
    openMini(exito) {
  
      this.modalService.open(exito,{ size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
    }
  
    
  }
  