import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from 'app/models/usuario';
import 'rxjs/add/operator/map' ;
import 'rxjs/add/operator/do' ;
import 'rxjs/add/operator/shareReplay' ;
import { map, pluck, share, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'environments/environment.prod';
import { Login } from 'app/models/login';
import { UsuarioService } from './usuario.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export const ANONYMOUS_USER : Usuario={
  ID:undefined,
  Nombre:'',
  Area:'',
  Rol:'',
  Usuario:'',
  Password:'',
  conectado:0,
  plantel:'On-Line'
}

@Injectable({
  providedIn:'root'
})
export class AuthService {

  private subject= new BehaviorSubject<Usuario>(ANONYMOUS_USER)

  user$:Observable<Usuario> = this.subject.asObservable();
  loginIn:Login[]=[]
  isLoggedIn$:Observable<boolean>=this.user$.map(user=>!!user.ID);

  isLoggedOut$:Observable<boolean> = this.isLoggedIn$.map(isLoggedIn=>!isLoggedIn)

  constructor(private http:HttpClient, public jwthelper: JwtHelperService
    ) {
   }

   signUp(email:string,password:string){

    return this.http.post<Usuario>(environment.apiUrl+"/signup",{email,password})
    .shareReplay()
    .do(user=>this.subject.next(user));
   }

   login(usuario:string,password:string){
    return this.http.post<any>(environment.apiUrl+"/login",{usuario:usuario,password:password})
    .pipe(map(user=>{
      if(user && user.accessToken){
        this.saveToken(user.accessToken,user.expiresIn,user.Nombre,user.Rol,user.Area)
      }
      return user;
    }))
   }

   isLoggedIn(usuario:number){
     console.log(usuario)
    return this.http.post(environment.apiUrl+"/conectado/"+usuario,{observe:'response'})
   }
   isLoggedOut(usuario:number){

     return this.http.post(environment.apiUrl+"/desconectado/"+usuario,{observe:'response'})

   }

   
   isAuthenticated(){
    const token = localStorage.getItem('ACCES_TOKEN');
    // Check whether the token is expired and return
    // true or false
   return !!token
   }

   logout():void{
     localStorage.removeItem('CURRENT_USER')
     localStorage.removeItem('ACCES_TOKEN');
     localStorage.removeItem('EXPIRES_IN')
     localStorage.removeItem('ROL')
     localStorage.removeItem('AREA')
   }

   private saveToken(token:string,expiresIn:string,user:string,rol:string,area:string):void{
    localStorage.setItem('ACCES_TOKEN',token);
    localStorage.setItem('CURRENT_USER',user);
    localStorage.setItem('EXPIRES_IN',expiresIn);
    localStorage.setItem('ROL',rol);
    localStorage.setItem('AREA',area);

   }

  //  createUser()
}
