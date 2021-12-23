import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbModal,NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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
  styleUrls: ['./tickets-table.component.css'],
  styles: [`
  .form-group.hidden {
    width: 0;
    margin: 0;
    border: none;
    padding: 0;
  }
  .custom-day {
    text-align: center;
    padding: 0.185rem 0.25rem;
    display: inline-block;
    height: 2rem;
    width: 2rem;
  }
  .custom-day.focused {
    background-color: #e6e6e6;
  }
  .custom-day.range, .custom-day:hover {
    background-color: rgb(2, 117, 216);
    color: white;
  }
  .custom-day.faded {
    background-color: rgba(2, 117, 216, 0.5);
  }
`]
})
export class TicketsTableComponent implements OnInit {
  @ViewChild('error') error= null;
  @ViewChild('exito') exito= null;

  hoveredDate: NgbDate | null = null;

  today: NgbDate | null;
  yesterday: NgbDate | null;

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
  model: NgbDateStruct;
  modelFin: NgbDateStruct;

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
  todayString:string;

  usuarioEnLinea:Usuario=  {
    ID:undefined,
    Usuario:'',
    Nombre:'Guest',
    Area:'',
    Rol:'',
    Password:'',
    plantel:'On-Line',
    Puesto:''
  }

  
  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    public ticketService:TicketService,
    public usuarioService:UsuarioService,
    public authService:AuthentificationService,
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter,
    public i18n: NgbDatepickerI18n 
  )
  { 
    this.today = calendar.getToday();
    this.yesterday = calendar.getPrev(this.today);

      this.todayString = this.today.month+"/"+this.today.day+"/"+this.today.year
    this.model=this.yesterday
    this.modelFin=this.today
  }

  ngOnInit()  {
    this.getTickets();
    this.getUsuarios();
    this.usuarioEnLinea=JSON.parse(localStorage.getItem('USUARIO'))
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
      modalRef.closed.subscribe(
        ()=>{
          this.refresh();
        },
        (err)=>{
          if(err){console.log(err)}
        },
        ()=>{
          console.log("mnodal closed")
        }
        )
  }

  completar(ticket:Tickets)
  {
  if(localStorage.getItem('EMAIL')==ticket.Responsable||localStorage.getItem('ROL')=='Administrador')
      {
        const modalRef = this.modalService.open(CompletarTicketComponent);
        modalRef.componentInstance.ticket = ticket;
        modalRef.closed.subscribe(
          ()=>{
            this.refresh();
          },
          (err)=>{
            if(err){console.log(err)}
          },
          ()=>{
            console.log("mnodal closed")
          }
          )
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

  //DATE HELPERSD
  
  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  fechaIni(ngbDate:NgbDate){
    const jsDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    console.log(jsDate)

    console.log("Tickedts Completados Sin Filtro:",this.listaTicketsCompletas)  

    this.listaTicketsCompletas.filter((item) =>
    item.Fecha_Fin.getTime() >= jsDate.getTime())

    console.log("Tickedts Completados Filtrados:",this.listaTicketsCompletas)  
  }
}

