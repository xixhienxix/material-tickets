import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Usuario} from '../app/models/usuario';
import { tap } from 'rxjs/operators';
import { Observable,BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment.prod';
import { jwtResponse } from 'app/models/jwtResponse';
@Injectable({
  providedIn: 'root'
})
export class AuthjwtService {
authSubject = new BehaviorSubject(false);
private token:string;
  constructor(private httpClient:HttpClient) { }

  register(user:Usuario):Observable<jwtResponse>{

    return this.httpClient.post<jwtResponse>(environment.apiUrl+"/register",user)
    .pipe(tap(
      (res:jwtResponse)=>{
        if(res){
          this.saveToken(res.dataUser.accessToken,res.dataUser.expire);
        }
      }
    ))
  }

  login(user:Usuario):Observable<jwtResponse>{

    return this.httpClient.post<jwtResponse>(environment.apiUrl+"/login",user)
    .pipe(tap(
      (res:jwtResponse)=>{
        if(res){
          //guardar token
          this.saveToken(res.dataUser.accessToken,res.dataUser.expire);
        }
      }
    ))
  }

  logOut():void{
    this.token='';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  private saveToken(token:string,expires_in:string):void{
    localStorage.setItem("ACCESS_TOKEN",token);
    localStorage.setItem("EXPIRES_IN",expires_in);
    this.token=token;
  }

  private getToken():string{
    if(!this.token){
      this.token=localStorage.getItem("ACCESS_TOKEN")
    }
    return this.token
  }
}
