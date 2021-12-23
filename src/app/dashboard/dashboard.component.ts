import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.prod"
import { Tickets } from 'app/models/tickets';
import { TicketService } from '../../services/tickets.service';
import { NuevosTicketsComponent } from 'app/components/nuevos-tickets/nuevos-tickets.component';
import { CompletarTicketComponent } from 'app/components/completar-ticket/completar-ticket/completar-ticket.component';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as Chartist from 'chartist';
import { BrowserStack } from 'protractor/built/driverProviders';
import { Usuario } from 'app/models/usuario';
import { UsuarioService } from 'services/usuario.service';
import { LoginComponent } from 'app/components/login/login/login.component';
import { AuthentificationService } from 'app/authentification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation:ViewEncapsulation.None
})


export class DashboardComponent implements OnInit {
 
  @ViewChild('error') error= null;
  @ViewChild('exito') exito= null;


  public listaTickets:Tickets[]=[];
  public listaTicketsNuevos:Tickets[]=[];
  public listaTicketsCompletas:Tickets[]=[];
  public listaTicketsXVencer:Tickets[]=[];
  public listaTicketsVencidas:Tickets[]=[];
  public listaTicketsVencidasUnDia:Tickets[]=[];
  public listaTicketsVencidasDosDias:Tickets[]=[];
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
    plantel:'On-Line',
    Puesto:''
  }

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    public ticketService:TicketService,
    public usuarioService:UsuarioService,
    public authService:AuthentificationService
  ) { 
      }

  ngOnInit() {
    this.getTickets();
    this.getUsuarios();
  }

  updateCharts()
  {
    let fecha = new Date()
    let fecha2 = new Date()

    this.minutosHoy= (fecha.getMinutes()-fecha2.getMinutes())+1

    setInterval(this.updateCharts,60000)
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
      this.listaTicketsVencidasUnDia.push(array)
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
      this.listaTicketsVencidasDosDias.push(array)
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
        this.charts();
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

  login(){

    const modalRef = this.modalService.open(LoginComponent, { size: 'sm' });
     modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.usuarioEnLinea=receivedEntry   
         })
     }

//  logOut(id:number){

//      this.authService.isLoggedOut(id).subscribe(
//       (res) => 
//       {
//         this.mensaje="Sesion Cerrada con exito"
//         const modalRef = this.modalService.open(this.exito,{size:'sm'});
//         this.usuarioEnLinea.conectado=0;
//       },
//       (err) =>{
//         this.mensaje="Hubo un problema al cerrar Sesion"
//         const modalRef = this.modalService.open(this.exito,{size:'sm'});
//         console.log('Error al Cerrar Sesion :', err.message)
//       },
//       ()=>{
//       })
//     }




  refresh()
  {
    this.listaTickets=[];
    this.listaTicketsNuevos=[]
    this.listaTicketsCompletas=[];
    this.listaTicketsXVencer=[];
    this.listaTicketsVencidas=[];
    this.listaTicketsVencidasUnDia=[];
    this.listaTicketsVencidasDosDias=[];
    this.listaUsuarios=[];

    this.getUsuarios();

    this.getTickets();
  }

  //CHARTS
    charts()
    {

      let completadosLunes=[]
      let completadosMartes=[]
      let completadosMiercoles=[]
      let completadosJueves=[]
      let completadosViernes=[]
      let completadosSabado=[]
      let completadosDomingo=[]
      let vencidosLunes=[]
      let vencidosMartes=[]
      let vencidosMiercoles=[]
      let vencidosJueves=[]
      let vencidosViernes=[]
      let vencidosSabado=[]
      let vencidosDomingo=[]

      let diaDeHoy = new Date()

      for(let i=0;i<this.listaTickets.length; i++)
      {
       let fechaCompletadoString = this.listaTickets[i].Fecha_Fin.toString()
       let diaCompeltado = fechaCompletadoString.split("T")[0]
       let fechaFinTicket = new Date(parseInt(diaCompeltado.split("-")[0]),parseInt(diaCompeltado.split("-")[1])-1,parseInt(diaCompeltado.split("-")[2]))

      if(this.listaTickets[i].Estatus==0){
        switch(fechaFinTicket.getDay()){
          case 0 :
            completadosDomingo.push(this.listaTickets[i])
            break;
          case 1 :
            completadosLunes.push(this.listaTickets[i])
            break;
          case 2 :
            completadosMartes.push(this.listaTickets[i])
            break;
          case 3 :
            completadosMiercoles.push(this.listaTickets[i])
            break;
          case 4 :
            completadosJueves.push(this.listaTickets[i])
            break;
          case 5 :
            completadosViernes.push(this.listaTickets[i])
            break;
          case 6 :
            completadosSabado.push(this.listaTickets[i])
            break;
        }
      }
      else {
        switch(fechaFinTicket.getDay()){
          case 0 :
            vencidosDomingo.push(this.listaTickets[i])
            break;
          case 1 :
            vencidosLunes.push(this.listaTickets[i])
            break;
          case 2 :
            vencidosMartes.push(this.listaTickets[i])
            break;
          case 3 :
            vencidosMiercoles.push(this.listaTickets[i])
            break;
          case 4 :
            vencidosJueves.push(this.listaTickets[i])
            break;
          case 5 :
            vencidosViernes.push(this.listaTickets[i])
            break;
          case 6 :
            vencidosSabado.push(this.listaTickets[i])
            break;
        }
      }

      if(i==this.listaTickets.length-1)
      {
        switch(diaDeHoy.getDay())
        {
          case 0:
            this.porcentajediaAnterior = (completadosDomingo.length  / (completadosSabado.length ? 0 : 1))*100
            this.vencidosdiaAnterior = (vencidosDomingo.length / (vencidosSabado.length ? 0 : 1))*100
          break; 
          case 1:
            this.porcentajediaAnterior = (completadosLunes.length / (completadosDomingo.length? 0 : 1))*100
            this.vencidosdiaAnterior = (vencidosLunes.length / (vencidosDomingo.length ? 0 : 1))*100

          break;
          case 2:
            this.porcentajediaAnterior = (completadosMartes.length / (completadosLunes.length? 0 : 1))*100
            this.vencidosdiaAnterior = (vencidosMartes.length / (vencidosLunes.length ? 0 : 1))*100

          break;
          case 3:
            this.porcentajediaAnterior = (completadosMiercoles.length / (completadosMartes.length? 0 : 1))*100
            this.vencidosdiaAnterior = (vencidosMiercoles.length / (vencidosMartes.length? 0 : 1))*100

          break;
          case 4:
            this.porcentajediaAnterior = (completadosJueves.length / (completadosMiercoles.length ? 0 : 1))*100
            this.vencidosdiaAnterior = (vencidosJueves.length / (vencidosMiercoles.length? 0 : 1))*100

          break;
          case 5:
            this.porcentajediaAnterior = (completadosViernes.length / (completadosJueves.length? 0 : 1))*100
            this.vencidosdiaAnterior = (vencidosViernes.length / (vencidosJueves.length? 0 : 1))*100

          break;
          case 6:
            this.porcentajediaAnterior = (completadosSabado.length / (completadosViernes.length? 0 : 1))*100
            this.vencidosdiaAnterior = (vencidosSabado.length / (vencidosViernes.length? 0 : 1))*100

          break;
         
        }
      }
    }





       /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
       const dataDailySalesChart: any = {
        labels: ['L', 'M', 'I', 'J', 'V', 'S', 'D'],
        series: [
            [completadosLunes.length, completadosMartes.length, completadosMiercoles.length, completadosJueves.length, completadosViernes.length, completadosSabado.length, completadosDomingo.length]
        ]
    };
   const optionsDailySalesChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: this.listaTickets.length, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */
    
    

    const dataCompletedTasksChart: any = {
        labels: ['L', 'M', 'I', 'J', 'V', 'S', 'D'],
        series: [
            [vencidosLunes.length, vencidosMartes.length, vencidosMiercoles.length, vencidosJueves.length, vencidosViernes.length, vencidosSabado.length, vencidosDomingo.length]
        ]
    };

   const optionsCompletedTasksChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: this.listaTickets.length, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
    }

    var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    var datawebsiteViewsChart = {
      labels: ['L', 'L', 'M', 'M', 'I', 'M', 'J', 'J', 'V', 'V', 'S', 'S', 'D', 'D'],
      series: [
        [completadosLunes.length, vencidosLunes.length, completadosMartes.length, vencidosMartes.length, 
          completadosMiercoles.length, vencidosMiercoles.length, completadosJueves.length,vencidosJueves.length, 
          completadosViernes.length, vencidosViernes.length, completadosSabado.length, vencidosSabado.length,
          completadosDomingo.length, vencidosDomingo.length]

      ]
    };
    var optionswebsiteViewsChart = {
        axisX: {
            showGrid: false
        },
        low: 0,
        high: 10,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
    }

    startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
}
