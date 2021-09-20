import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthentificationService } from "app/authentification.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private auth:AuthentificationService,private router : Router){}

    canActivate():boolean{
        
        if (!this.auth.isAuthenticated()){
            if(localStorage.getItem('ROL')=='Administrador'){        this.router.navigate(['dashboard'])        }
            else this.router.navigate(['auth'])
            return false;
        }else return true;

    }

   
}