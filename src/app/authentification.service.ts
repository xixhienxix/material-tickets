import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { map } from 'rxjs/operators';
import { Usuario } from './models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(public http:HttpClient) { }
  
  login(usuario:string,password:string){
    return this.http.post<any>(environment.apiUrl+"/login",{usuario:usuario,password:password})
    .pipe(map(user=>{
      if(user && user.accessToken){
        this.saveToken(user.accessToken,user.expiresIn,user.Nombre,user.Rol,user.Area,user.Usuario,user.plantel,user)
      }
      return user;
    }))
   }

   changePassword(ID:string,nueva:string){
     return this.http.post(environment.apiUrl+"/change",{ID:ID,nueva:nueva})
   }

   saveToken(token:string,expiresIn:string,user:string,rol:string,area:string,email:string,plantel:string,usuario:Usuario):void{
    localStorage.setItem('ACCESS_TOKEN',token);
    localStorage.setItem('CURRENT_USER',user);
    localStorage.setItem('EXPIRES_IN',expiresIn);
    localStorage.setItem('ROL',rol);
    localStorage.setItem('AREA',area);
    localStorage.setItem('EMAIL',email)
    localStorage.setItem('PLANTEL',plantel)
    localStorage.setItem('USUARIO',JSON.stringify(usuario))
   }

   isLoggedOut(){}

   isAuthenticated()
   {
     if(localStorage.getItem('ACCESS_TOKEN')){return true}
     else {return false}
    }
}
