import { Component, Input, Output,EventEmitter } from "@angular/core";
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { AuthService } from "services/auth.service";
import { Usuario } from "app/models/usuario";
import { AreasService } from "services/areas.service";
import { Areas } from "app/models/areas";
@Component({
    selector:'auth-selector',
    templateUrl:'./auth.component.html'
})
export class AuthComponent{
isLogginMode=true;
usuario:Usuario;
listaAreas:Areas[]=[];

constructor(
  public authService : AuthService,
  public areaService: AreasService
)
{

}

ngOnInit(){
  this.getAreas();
}

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

onSubmit(ngForm:NgForm){
  console.log(ngForm)

 // this.authService.signUp()
}
}