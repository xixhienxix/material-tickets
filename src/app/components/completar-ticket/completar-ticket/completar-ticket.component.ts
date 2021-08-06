import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http";
import { TicketService } from '../../../../services/tickets.service';

@Component({
  selector: 'completar-ticket',
  templateUrl: './completar-ticket.component.html',
  styleUrls: ['./completar-ticket.component.css']
})
export class CompletarTicketComponent implements OnInit {
  id: number;
  
  constructor(
    public modal: NgbActiveModal,
    private http: HttpClient,
    public ticketService:TicketService,

  ) { }

  ngOnInit(): void {
  }
  close(){
    this.modal.close();
  }
  completarTicket(id:number)
  {
    this.ticketService.completTicket(id)
  }
}
