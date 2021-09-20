import { Injectable } from '@angular/core';
import { Campanas } from '../app/models/campana'
import { Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import {environment} from "../environments/environment.prod"
import { catchError, map, tap } from 'rxjs/operators';
import { Areas } from 'app/models/areas';


@Injectable({
  providedIn: 'root'
})
export class AreasService  {


    getAreas():Observable<Areas[]>
    {
        return this.http.get<Areas[]>(environment.apiUrl+"/areas")
    }
    getPlanteles(){
      console.log(environment.apiUrl+'/plantel')
      return this.http.get(environment.apiUrl+'/plantel')
  }


  constructor(private http: HttpClient) { }
}