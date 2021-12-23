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
import { Plantel } from 'app/models/plantel';
import { TicketsTableComponent } from '../tickets-table/tickets-table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nuevos-tickets',
  templateUrl: './nuevos-tickets.component.html',
  styleUrls: ['./nuevos-tickets.component.css'],
  encapsulation: ViewEncapsulation.None,


})
export class NuevosTicketsComponent implements OnInit {
  public listaTickets:Tickets[];
  public listaAreas:Areas[];
  public listaAreasFiltradas:Areas[];
  public listaUsuarios:Usuario[];
  public listaCampanas:Campanas[]=[];
  public listaUsuariosPorArea:Usuario[]=[];
  public listaPlanteles:Plantel[]=[];
  public listaUsuariosPorPlantel:Usuario[]=[];
  formGroup:FormGroup;
  selectedPlantel =''; 
  receptor:string;
  closeResult: string;
  usuario:Usuario;



  @ViewChild('exito') exito=null;


  constructor( private modalService: NgbModal,
    public areaService:AreasService,
    public usuarioservice:UsuarioService,
    public modal: NgbActiveModal,
    private http: HttpClient,
    public ticketService:TicketService,
    public campanaService:CampanasService,
    private fb : FormBuilder,
    ) { }

    ngOnInit() {
      this.initForm();
      this.getCampanas();
      this.getAreas();
      this.getUsuarios();
      this.getPlanteles();
    }

    initForm(){
      this.formGroup = this.fb.group({
        plantel : ['',Validators.required],
        area:['',Validators.required],
        responsable : ['',Validators.required]
      })
    }
    get f() {return this.formGroup.controls}
  
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
        const rol=localStorage.getItem('ROL')

        // if(rol=='Administrador'){
          this.listaAreas=response
        // }else{
          
          // this.listaAreas=response.filter(response=>response.plantel==localStorage.getItem('PLANTEL'))
        // }
      })
    }

    getPlanteles()
    {
      this.areaService.getPlanteles()
      .subscribe((response:Plantel[])=>{
        const rol=localStorage.getItem('ROL')
        const area=localStorage.getItem('AREA')

        if(rol=='Administrador'||rol=='Supervisor'||area=='S.A.U.')
        {
          for(let i=0; i<response.length;i++){

            this.listaPlanteles.push(response[i])
          }
        }else{

          for(let i=0; i<response.length;i++){
            if(response[i].plantel==localStorage.getItem('PLANTEL'))
              {this.listaPlanteles.push(response[i])}
          }
        }
      })
    }

    getUsuarios()
    {
      this.usuarioservice.getUsuarios()
      .subscribe((response)=>{
        this.listaUsuarios=response
      })
    }
  
    onChange(event:any){

      this.receptor=event.source.selected.viewValue;
    }
    guardaTicket(campana:string,responsable:string,descripcion:string)
    {
      console.log(this.receptor)
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
          Color:"#21D864",
          nota_completado:''
          };
          let email=localStorage.getItem('EMAIL')
          this.ticketService.postTickets(tickets,email,this.receptor)
          .subscribe(
          res => console.log('HTTP response', res),
          err => console.log('HTTP Error', err),
          () =>
          {            
            this.openMini(this.exito)
          })
      this.ticketService.getTickets();
    }
  
    filtroPlantel(){

      this.listaAreasFiltradas=[]
      this.listaUsuariosPorArea=[]

      this.listaUsuariosPorPlantel = this.listaUsuarios.filter(plantel=> plantel.plantel==this.f.plantel.value)
      // this.listaAreas = this.listaAreas.filter(areas=>areas.plantel==value)
      this.listaAreasFiltradas = this.listaAreas.filter(plantel=>plantel.plantel==this.f.plantel.value)
      console.log(this.listaAreas)
    }


    filtroAreas(plantel:string,value:string){

      this.listaUsuariosPorArea = this.listaUsuarios.filter(areas=> areas.Area==value && areas.plantel==plantel)

      console.log(this.listaUsuariosPorArea)
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
    closeModal(){
      this.modal.close();
    }
  

  }
  