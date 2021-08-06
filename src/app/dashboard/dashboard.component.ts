import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoTicketComponent } from '../nuevo-ticket/nuevo-ticket.component';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment"
import { Tickets } from 'app/models/tickets';
import { TicketService } from '../../services/tickets.service';
import { NuevosTicketsComponent } from 'app/components/nuevos-tickets/nuevos-tickets.component';
import { CompletarTicketComponent } from 'app/components/completar-ticket/completar-ticket/completar-ticket.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  @ViewChild('error') error= null;

  public listaTickets:Tickets[]=[];
  public listaTicketsCompletas:Tickets[]=[];
  public listaTicketsXVencer:Tickets[]=[];
  public listaTicketsVencidas:Tickets[]=[];
  public listaTicketsVencidasUnDia:Tickets[]=[];
  public listaTicketsVencidasDosDias:Tickets[]=[];

  reloadInterval:number = 60;
  interval;
  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    public ticketService:TicketService

  ) { }

  ngOnInit() {
      this.getTickets()
  }

  
  Init(array:Tickets)
  {
    let color

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
      if( (diferenciaMili) < almostTimeUp && array.Estatus != 0)
      {
        array.Color="#21D864" //verde
        this.listaTickets.push(array)
        this.ticketService.putTickets(array).subscribe(
          result=>//Result handler
          {
            console.log(result)
          },
          error=>//Error Handler
          {
            this.modalService.open(this.error,{size:'sm'})
            console.log(error)
          },
          ()=> //Completed Task 
          {
            console.log("Actualizado Verde") 
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
            console.log(result)
          },
          error=>//Error Handler
          {
            this.modalService.open(this.error,{size:'sm'})
            console.log(error)
          },
          ()=> //Completed Task 
          {
            console.log("Actualizado Amarillo") 
          }
          )
      }else if((diferenciaMili)  > hr && (diferenciaMili) < oneDay && array.Estatus != 0)
      {
        array.Color="#E83728" //Rojo
        this.listaTicketsVencidas.push(array)
        this.ticketService.putTickets(array).subscribe(
          result=>//Result handler
          {
            console.log(result)
          },
          error=>//Error Handler
          {
            this.modalService.open(this.error,{size:'sm'})
            console.log(error)
          },
          ()=> //Completed Task 
          {
            console.log("Actualizado Rojo") 
          }
          )
      }
    } else if ((diferenciaMili) < twoDay && array.Estatus != 0)
    {
      array.Color="#EC86AE" //rojo 1 Dia
      this.listaTicketsVencidasUnDia.push(array)
      this.ticketService.putTickets(array).subscribe(
        result=>//Result handler
        {
          console.log(result)
        },
        error=>//Error Handler
        {
          this.modalService.open(this.error,{size:'sm'})
          console.log(error)
        },
        ()=> //Completed Task 
        {
          console.log("Actualizado Rojo 1 Dia") 
        }
        )
    }
    else if((diferenciaMili)>=twoDay && array.Estatus != 0)
    {
      array.Color="#FFC0D9" // rojo 2 Dias
      this.listaTicketsVencidasDosDias.push(array)
      this.ticketService.putTickets(array).subscribe(
        result=>//Result handler
        {
          console.log(result)
        },
        error=>//Error Handler
        {
          this.modalService.open(this.error,{size:'sm'})
          console.log(error)
        },
        ()=> //Completed Task 
        {
          console.log("Actualizado Rojo 2 Dias") 
        }
        )
    }
    else if(array.Estatus==0)
    {
      this.listaTicketsCompletas.push(array)
      this.ticketService.putTickets(array).subscribe(
        result=>//Result handler
        {
          console.log(result)
        },
        error=>//Error Handler
        {
          this.modalService.open(this.error,{size:'sm'})
          console.log(error)
        },
        ()=> //Completed Task 
        {
          console.log("Actualizado Sin Color") 
        }
        )
    }
           
  }

  getTickets()
  {
    this.http.get<any>("http://localhost:8081/api"+"/tickets")
      // .pipe(
      // finalize(() => {
      //   setInterval(this.refresh,5000)
      // }))
      .subscribe(
      res => 
      {
      console.log('HTTP response', res)
        for(let i=0;i<res.length;i++)
        {
          this.Init(res[i])
        }
      },
      err => console.log('HTTP Error', err),
      ()=>{
      
      })
  }

  nvoTicket()
  {
    const modalRef = this.modalService.open(NuevosTicketsComponent, { size: 'md' });
  }

  completar(id:number)
  {
    const modalRef = this.modalService.open(CompletarTicketComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
    console.log(receivedEntry);
    })
  }

  refresh()
  {
    this.listaTickets=[];
    this.listaTicketsCompletas=[];
    this.listaTicketsXVencer=[];
    this.listaTicketsVencidas=[];
    this.listaTicketsVencidasUnDia=[];
    this.listaTicketsVencidasDosDias=[];
    
    this.getTickets();
  }
}
