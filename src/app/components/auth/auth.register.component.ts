import { Component } from "@angular/core";
import { AreasService } from "services/areas.service";
import { Areas } from "app/models/areas";

@Component({
    selector:'auth-register',
    templateUrl:'./auth.register.component.html'
})

export class AuthRegisterComponent{

    listaAreas:Areas[]=[]

    constructor(
        private areaService:AreasService
    ){}

ngOnInit(){
    
    this.areaService.getAreas();
}

registro(ngForm){

}

}