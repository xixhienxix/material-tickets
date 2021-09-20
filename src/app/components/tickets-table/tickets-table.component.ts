import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthentificationService } from 'app/authentification.service';
import { Tickets } from 'app/models/tickets';
import { Usuario } from 'app/models/usuario';
import { environment } from 'environments/environment.prod';
import { TicketService } from 'services/tickets.service';
import { UsuarioService } from 'services/usuario.service';
import { CompletarTicketComponent } from '../completar-ticket/completar-ticket/completar-ticket.component';
import { NuevosTicketsComponent } from '../nuevos-tickets/nuevos-tickets.component';

@Component({
  selector: 'tickets-table',
  templateUrl: './tickets-table.component.html',
  styleUrls: ['./tickets-table.component.css']
})
export class TicketsTableComponent implements OnInit {
  @ViewChild('error') error= null;
  @ViewChild('exito') exito= null;


  public listaTickets:Tickets[]=[];
  public listaTicketsNuevos:Tickets[]=[];
  public listaTicketsCompletas:Tickets[]=[];
  public listaTicketsXVencer:Tickets[]=[];
  public listaTicketsVencidas:Tickets[]=[];
  // public listaTicketsVencidasUnDia:Tickets[]=[];
  // public listaTicketsVencidasDosDias:Tickets[]=[];
  public listaArturo:Tickets[]=[];
  public listaRodrigo:Tickets[]=[];
  public listaOctavio:Tickets[]=[];
  public listaCharly:Tickets[]=[];
  public listaArturoCompletos:Tickets[]=[];
  public listaRodrigoCompletos:Tickets[]=[];
  public listaOctavioCompletos:Tickets[]=[];
  public listaCharlyCompletos:Tickets[]=[];
  mensaje:string;
  listaUsuarios:Usuario[]=[];
  reloadInterval:number = 60;
  interval;
  options: any;
  fechaHoy :Date = new Date()
  minutosHoy:number
  porcentajediaAnterior:number
  vencidosdiaAnterior:number
  banderaLogin:boolean=false
  usuarioEnLinea:Usuario=  {
    ID:undefined,
    Usuario:'',
    Nombre:'Guest',
    Area:'',
    Rol:'',
    Password:'',
    conectado:0,
    plantel:'On-Line'
  }

  
  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    public ticketService:TicketService,
    public usuarioService:UsuarioService,
    public authService:AuthentificationService
  ) { }

  ngOnInit()  {
    this.getTickets();
    this.getUsuarios();
  }

  Init(array:Tickets)
  {

    let color
    this.listaTickets.push(array)

    if(array.Estatus==0){this.listaTicketsCompletas.push(array)}

    let today = +new Date();
    let manana = new Date().getTime();
    let pasadoManana = new Date().getTime();
    
    const hr = 3600000
    const almostTimeUp = (3600000 * 80)/100
    const oneDay = 60 * 60 * 24 * 1000
    const twoDay = 60 * 60 * 48 * 1000

    const arrayMiliseconds = new Date(array.Fecha_Inicio).getTime()
    const diferenciaMili=today-arrayMiliseconds  

    if((diferenciaMili)<oneDay)
    {
      //HORAS
      if( (diferenciaMili) < almostTimeUp && array.Estatus != 0 )
      {
        array.Color="#21D864" //verde
        this.listaTicketsNuevos.push(array)
        this.ticketService.putTickets(array).subscribe(
          result=>//Result handler
          {
          },
          error=>//Error Handler
          {
            this.modalService.open(this.error,{size:'sm'})
            console.log(error.message)
          },
          ()=> //Completed Task 
          {
            // console.log("Actualizado Verde") 
          }
          )
        
      }
      if( (diferenciaMili) >= almostTimeUp && (diferenciaMili) < hr && array.Estatus != 0)
      {
        array.Color="#F2C811" //amarrillo
        this.listaTicketsXVencer.push(array)
        this.ticketService.putTickets(array).subscribe(
          result=>//Result handler
          {
          },
          error=>//Error Handler
          {
            this.modalService.open(this.error,{size:'sm'})
            console.log(error.message)
          },
          ()=> //Completed Task 
          {
            // console.log("Actualizado Amarillo") 
          }
          )
      }else if((diferenciaMili)  > hr && (diferenciaMili) < oneDay && array.Estatus != 0)
      {
        array.Color="#E83728" //Rojo
        this.listaTicketsVencidas.push(array)
        this.ticketService.putTickets(array).subscribe(
          result=>//Result handler
          {
          },
          error=>//Error Handler
          {
            this.modalService.open(this.error,{size:'sm'})
            console.log(error.message)
          },
          ()=> //Completed Task 
          {
            // console.log("Actualizado Rojo") 
          }
          )
      }
    } else if ((diferenciaMili) < twoDay && array.Estatus != 0)
    {
      array.Color="#EC86AE" //rojo 1 Dia
      // this.listaTicketsVencidasUnDia.push(array)
      this.listaTicketsVencidas.push(array)
      this.ticketService.putTickets(array).subscribe(
        result=>//Result handler
        {
        },
        error=>//Error Handler
        {
          this.modalService.open(this.error,{size:'sm'})
          console.log(error.message)
        },
        ()=> //Completed Task 
        {
          // console.log("Actualizado Rojo 1 Dia") 
        }
        )
    }
    else if((diferenciaMili)>=twoDay && array.Estatus != 0)
    {
      array.Color="#FFC0D9" // rojo 2 Dias
      // this.listaTicketsVencidasDosDias.push(array)
      this.listaTicketsVencidas.push(array)
      this.ticketService.putTickets(array).subscribe(
        result=>//Result handler
        {
        },
        error=>//Error Handler
        {
          this.modalService.open(this.error,{size:'sm'})
          console.log(error.message)
        },
        ()=> //Completed Task 
        {
          // console.log("Actualizado Rojo 2 Dias") 
        }
        )
    }
    else if(array.Estatus==0)
    {
      this.listaTicketsCompletas.push(array)
      this.ticketService.putTickets(array).subscribe(
        result=>//Result handler
        {
        },
        error=>//Error Handler
        {
          this.modalService.open(this.error,{size:'sm'})
          console.log(error.message)
        },
        ()=> //Completed Task 
        {
          // console.log("Actualizado Sin Color") 
        }
        )
    }
           
  }

  getTickets()
  {
    this.http.get<any>(environment.apiUrl+"/tickets")
      .subscribe(
      res => 
      {
        for(let i=0;i<res.length;i++)
        {
          this.Init(res[i])
        }
      },
      err => console.log('GET TICKETS ERROR - HTTP Error :', err.message),
      ()=>{
      
      })
  }

  getUsuarios()
  {
    this.usuarioService.getUsuarios()
      .subscribe(
      res => 
      {
        this.listaUsuarios=res
      },
      err => console.log('GET TICKETS ERROR - HTTP Error :', err.message),
      ()=>{
      
      })
  }

  nvoTicket()
  {
      const modalRef = this.modalService.open(NuevosTicketsComponent, { size: 'md' });
      modalRef.componentInstance.usuario=this.usuarioEnLinea  
  }

  completar(ticket:Tickets)
  {
  if(localStorage.getItem('CURRENT_USER')==ticket.Responsable||localStorage.getItem('ROL')=='Administrador')
      {
        const modalRef = this.modalService.open(CompletarTicketComponent);
        modalRef.componentInstance.ticket = ticket;
      }
    else 
    {
      this.mensaje ='Este Ticket no esta asignado a este usuario'
      this.modalService.open(this.error,{size:'sm'})
    }
    
  }
    

  

  refresh()
  {
    this.listaTickets=[];
    this.listaTicketsNuevos=[]
    this.listaTicketsCompletas=[];
    this.listaTicketsXVencer=[];
    this.listaTicketsVencidas=[];
    // this.listaTicketsVencidasUnDia=[];
    // this.listaTicketsVencidasDosDias=[];
    this.listaUsuarios=[];

    this.getUsuarios();

    this.getTickets();
  }

}
