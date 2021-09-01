import { Injectable } from '@angular/core';
import { Campanas } from '../app/models/campana'
import { Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import {environment} from "../environments/environment.prod"
import { catchError, map, tap } from 'rxjs/operators';
import { Usuario } from 'app/models/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService  {


    getUsuarios():Observable<Usuario[]>
    {
        return this.http.get<Usuario[]>(environment.apiUrl+"/usuarios")
    }
  

  constructor(private http: HttpClient) { }
}