import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from 'app/authentification.service';
import { Usuario } from 'app/models/usuario';
import { first } from 'rxjs/operators';
import { AlertService } from 'services/alert.service';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  @ViewChild('exito') exito=null;

  usuario : any
  passwordForm : FormGroup
  submitted:boolean=false;
  loading:boolean=false;
  closeResult: string;

  constructor(public formBuilder:FormBuilder,
    public alertService:AlertService,
    public authServices:AuthentificationService,
    public modalService:NgbModal,
    public router : Router,
    public modal: NgbActiveModal,

   ) { }


  ngOnInit(): void {
    console.log(this.usuario)
    this.passwordForm= this.formBuilder.group({
      email : [this.usuario.Usuario,Validators.required],
      // password:['',Validators.required],
      nueva:['',Validators.required]
    })

  }
  get f() {return this.passwordForm.controls}

  onSubmit(){
    this.submitted=true

    if(this.passwordForm.invalid){
      return;
    }
  
    
    this.loading=true;
    this.authServices.changePassword(this.usuario.ID,this.f.nueva.value)
    .pipe(first())
    .subscribe(
      (value)=>{
        if(value){
         this.openMini(this.exito)
        }
        },
        (err)=>{
          if(err=='Bad Request'){err='Usuario o Contraseña Invalidos'}
            this.alertService.error(err);
            this.loading = false;        
        },
        ()=>{
  
        }
      )
   // this.authentification.signUp()
  }

  
  openMini(exito) {
  
   const modalRef = this.modalService.open(exito,{ size: 'sm' })
   setTimeout(() => {
    modalRef.close('Close click');
  },4000)
    modalRef.closed.subscribe(
      ()=>{
        this.router.navigate(['auth'])
      },//SUCCESS
      ()=>{},//ERROR
      ()=>{}//FINALLY
      );
  
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
