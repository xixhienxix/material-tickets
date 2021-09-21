import { Component, Input, Output,EventEmitter } from "@angular/core";
import { FormGroup, FormControl, NgForm, Form, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from "app/models/usuario";
import { AreasService } from "services/areas.service";
import { Areas } from "app/models/areas";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { AlertService } from "services/alert.service";
import { AuthentificationService } from "app/authentification.service";
@Component({
    selector:'auth-selector',
    templateUrl:'./auth.component.html'
})
export class AuthComponent{
isLogginMode=true;
usuario:Usuario;
listaAreas:Areas[]=[];
loginForm:FormGroup;
submitted:boolean=false;
loading:boolean=false;

constructor(
  public authentificationService:AuthentificationService,
  public alertService:AlertService,
  public authService : AuthentificationService,
  public areaService: AreasService,
  private router : Router,
  public formBuilder:FormBuilder
)
{

}

ngOnInit(){
  this.loginForm =  this.formBuilder.group({
    email : ['',Validators.required],
    password: ['',Validators.required],
  })
  this.getAreas();
}

get f() {return this.loginForm.controls}

onSwitchMode(){
  this.isLogginMode=!this.isLogginMode;
}

getAreas()
{
  this.areaService.getAreas()
  .subscribe((response)=>{
    this.listaAreas=response
  })
}


onSubmit(){
  this.submitted=true

  if(this.loginForm.invalid){
    return;
  }

  this.loading=true;
  this.authentificationService.login(this.f.email.value,this.f.password.value)
  .pipe(first())
  .subscribe(
    (value)=>{
      if(value){
        this.router.navigate(['tickets'])
      }
      },
      (err)=>{
        if(err=='Bad Request'||'Unknown Error')
          {
            err='Usuario o Contraseña Invalidos'
          }
          this.alertService.error(err);
          this.loading = false;        
      },
      ()=>{

      }
    )
 // this.authentification.signUp()
}
registro(ngForm){
  console.log(ngForm.value)

  // this.authentification.login(ngForm.value.usuarioRegistro,ngForm.value.passwordRegistro)
  // .subscribe(
  //   (value)=>{
  //     console.log(value)
  //     },
  //     (err)=>{
  //       if(err){
  //         console.log(err)
  //       }
  //     },
  //     ()=>{

  //     }
  //   )
}
}