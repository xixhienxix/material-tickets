import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plantel } from 'app/models/plantel';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PlantelesService {

  constructor(
    private http : HttpClient
  ) { }

  getPlanteles(){
    return this.http.get<Plantel[]>(environment.apiUrl+'/plantel')
  }
}
