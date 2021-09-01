import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from 'app/models/usuario';
import 'rxjs/add/operator/map' ;
import 'rxjs/add/operator/do' ;
import 'rxjs/add/operator/shareReplay' ;
import { pluck, share, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'environments/environment.prod';
import { Login } from 'app/models/login';
import { UsuarioService } from './usuario.service';

export const ANONYMOUS_USER : Usuario={
  ID:undefined,
  Nombre:'',
  Area:'',
  Rol:'',
  Usuario:'',
  Password:'',
  conectado:0
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private subject= new BehaviorSubject<Usuario>(ANONYMOUS_USER)

  user$:Observable<Usuario> = this.subject.asObservable();
  loginIn:Login[]=[]
  isLoggedIn$:Observable<boolean>=this.user$.map(user=>!!user.ID);

  isLoggedOut$:Observable<boolean> = this.isLoggedIn$.map(isLoggedIn=>!isLoggedIn)

  constructor(private http:HttpClient
    ) {
   }

   signUp(email:string,password:string){

    return this.http.post<Usuario>(environment.apiUrl+"/signup",{email,password})
    .shareReplay()
    .do(user=>this.subject.next(user));
   }

   login(usuario:string,password:string){

    // this.loginIn = new {
    //   usuario:usuario,
    //   password:password
    // }

    return this.http.get(environment.apiUrl+"/login")
   }

   isLoggedIn(usuario:number){
     console.log(usuario)
    return this.http.post(environment.apiUrl+"/conectado/"+usuario,{observe:'response'})
   }
   isLoggedOut(usuario:number){

     return this.http.post(environment.apiUrl+"/desconectado/"+usuario,{observe:'response'})

   }

  //  createUser()
}
