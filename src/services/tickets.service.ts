import { Injectable } from '@angular/core';
import { Tickets } from '../app/models/tickets'
import { Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import {environment} from "../environments/environment.prod"
import { catchError, map, tap } from 'rxjs/operators';
import {HttpHeaders} from '@angular/common/http'
import { Usuario } from 'app/models/usuario';



@Injectable({
  providedIn: 'root'
})
export class TicketService  {


    getTickets():Observable<Tickets[]>
    {
        return this.http.get<Tickets[]>(environment.apiUrl+"/tickets")
    }
  
    postTickets(tickets:Tickets,email:string,receptor:string)
    {
    return this.http.post<Tickets>(environment.apiUrl+"/tickets",{tickets,email,receptor})
    }

    putTickets(tickets:Tickets)
    {
    return this.http.put<Tickets>(environment.apiUrl+"/tickets",tickets)
    }

    completarTicket(id:number,descripcionCompletado:string)
    {
      console.log("Servuice ID", id)
    return this.http.post(environment.apiUrl+"/reportes/tickets/"+id,{descripcionCompletado},{observe:'response'})
    }



  constructor(private http: HttpClient) { }
}
