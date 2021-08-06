import { Component, OnInit,ViewChild,ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment"
import { Tickets } from 'app/models/tickets';
import { Campanas } from '../models/campana';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TicketService } from '../../services/tickets.service';
import { CampanasService } from '../../services/campanas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nuevo-ticket',
  templateUrl: './nuevo-ticket.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./nuevo-ticket.component.css']
})

export class NuevoTicketComponent implements OnInit {
  public listaTickets:Tickets[];
  public listaCampanas:Campanas[]=[];
  closeResult: string;

  @ViewChild('exito') exito=null;

  constructor(
    private modalService: NgbModal,
    public modal: NgbActiveModal,
    private http: HttpClient,
    public ticketService:TicketService,
    public campanaService:CampanasService,
  ) {

   }

  ngOnInit() {
    this.getCampanas();
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

  guardaTicket(campana,responsable)
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
      Descripcion:campana,
      Responsable:responsable,
      Supervisado:'',
      Creado_Por:'Arturo',
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
        console.log('HTTP request completed.')
        this.ticketService.getTickets().subscribe((response)=>
        {
          console.log(response)
        })
        this.openMini(this.exito)
        this.ticketService.getTickets();
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
