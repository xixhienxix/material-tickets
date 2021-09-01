import { Component,Output,EventEmitter, OnInit, OnDestroy, ChangeDetectorRef,ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'services/auth.service';
import { AreasService } from 'services/areas.service';
import { Areas } from 'app/models/areas';
import { CampanasService } from 'services/campanas.service';
import { Campanas } from 'app/models/campana';
import { UsuarioService } from 'services/usuario.service';
import { Usuario } from 'app/models/usuario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
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
    private modalService: NgbModal,
    public modal: NgbActiveModal,
    public areaService : AreasService,
    public campanaService:CampanasService,
    public authService:AuthService,
    public usuarioService:UsuarioService,
    private fb:FormBuilder,
    ) { 
    // this.loginForm=this.fb.group({
    //   email:['',Validators.required],
    //   password:['',Validators.required],
    //   confirm:['',Validators.required],
    //   area:['',Validators.required]
    // })
  }

  // get email() {
  //   return this.loginForm.get('email');
  // }  get password() {
  //   return this.loginForm.get('password');
  // }  get confirm() {
  //   return this.loginForm.get('confirm');
  // }  get area() {
  //   return this.loginForm.get('area');
  // }

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
        this.authService.isLoggedIn(this.listaUsuarios[i].ID)
        .subscribe((response)=>{

          this.mensaje="Sesion Iniciada con exito ";
          this.passEntry.emit(this.listaUsuarios[i]);
          // const modalRef = this.modalService.open(this.espere,{size:'sm'});
          this.modal.close();
        });
      }else
      this.logineado==false
    }

      // this.authService.login(email,password)
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
  submit(){
    
  }
}
