import { Component,EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthjwtService } from 'services/authjwt.service';
import { Usuario } from 'app/models/usuario';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AreasService } from 'services/areas.service';
import { CampanasService } from 'services/campanas.service';
import { UsuarioService } from 'services/usuario.service';
import { Observable } from 'rxjs';
import { Areas } from 'app/models/areas';
import { FormGroup, NgForm } from '@angular/forms';
import { Campanas } from 'app/models/campana';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponentJwt implements OnInit {
  @ViewChild('exito') exito=null;
  @ViewChild('falla') falla=null;
  @ViewChild('espere') espere=null;

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  areaList:Areas[]=[]
  listaCampanas:Campanas[]=[]
  listaUsuarios:Usuario[]=[];
  closeResult: string;
  logineado:boolean=false;
  isLoggedIn$:Observable<boolean>;
  mensaje:string
  constructor(
    private router:Router,
    private modalService: NgbModal,
    public modal: NgbActiveModal,
    public areaService : AreasService,
    public campanaService:CampanasService,
    public usuarioService:UsuarioService) { }

    ngOnInit(): void {
      this.getAreas();
      this.getCampanas();
      this.getUsuarios();
    }
  
    getCampanas()
    {
  
      this.campanaService.getCampanas()
      .subscribe((response)=>{
        this.listaCampanas=response
        console.log("listaCampanas : ",this.areaList)
  
      })
  
    }
  
    getUsuarios(){
      this.usuarioService.getUsuarios()
      .subscribe((response)=>{
        this.listaUsuarios=response
        // console.log("listaUsuarios : ",this.areaList)
  
      })
  
    }
  
    getAreas(){
      this.areaService.getAreas().subscribe((response)=>{
        for(let i=0;i<response.length;i++)
        {
          this.areaList.push(response[i])
        }
        console.log("Lista Areas : ",this.areaList)
      })
    }
  
    signIn(email:string,password:string){
      let emailSinWhiteSpaces = email.trim()
      let passwordSinWhiteSpaces = password.trim()
  
      for(let i=0; i<this.listaUsuarios.length;i++)
      {
  
        if(this.listaUsuarios[i].Usuario==passwordSinWhiteSpaces&&this.listaUsuarios[i].Password==emailSinWhiteSpaces)
        {
          // .subscribe((response)=>{
  
          //   this.mensaje="Sesion Iniciada con exito ";
          //   this.passEntry.emit(this.listaUsuarios[i]);
          //   this.modal.close();
          // });
        }else
        this.logineado==false
      }
  
        // this.authentification.login(email,password)
        // .subscribe(
        //   ()=>console.log("USER CREATED SUCCESFULLY"),
        //   console.error
        //   );
    }
  
    openMini(exito) {
    
      this.modalService.open(exito,{ size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    
    }
    openMiniFalla(falla) {
    
      this.modalService.open(falla,{ size: 'sm' }).result.then((result) => {
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
    onSubmit(ngForm:NgForm){
      console.log(ngForm)
    
     // this.authentification .signUp()
    }
}
