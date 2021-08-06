import { Injectable } from '@angular/core';
import { Campanas } from '../app/models/campana'
import { Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import {environment} from "../environments/environment"
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CampanasService  {


    getCampanas():Observable<Campanas[]>
    {
        return this.http.get<Campanas[]>("http://localhost:8081/api"+"/campanas")
    }
  


  constructor(private http: HttpClient) { }
}
