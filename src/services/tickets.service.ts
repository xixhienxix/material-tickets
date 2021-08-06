import { Injectable } from '@angular/core';
import { Tickets } from '../app/models/tickets'
import { Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import {environment} from "../environments/environment"
import { catchError, map, tap } from 'rxjs/operators';
import {HttpHeaders} from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class TicketService  {


    getTickets():Observable<Tickets[]>
    {
        return this.http.get<Tickets[]>("http://localhost:8081/api"+"/tickets")
    }
  
    postTickets(tickets:Tickets)
    {
    return this.http.post<Tickets>("http://localhost:8081/api"+"/tickets",tickets)
    }

    putTickets(tickets:Tickets)
    {
    return this.http.put<Tickets>("http://localhost:8081/api"+"/tickets",tickets)
    }

    completTicket(id:number)
    {
    return this.http.put("http://localhost:8081/api"+"/complete/tickets/:id",id)
    }

  constructor(private http: HttpClient) { }
}
