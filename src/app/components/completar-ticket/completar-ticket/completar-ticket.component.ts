import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http";
import { TicketService } from '../../../../services/tickets.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Tickets } from 'app/models/tickets';
import { PreguntasService } from 'services/preguntas.service';
import { Preguntas } from 'app/models/preguntas';

@Component({
  selector: 'completar-ticket',
  templateUrl: './completar-ticket.component.html',
  styleUrls: ['./completar-ticket.component.css']
})
export class CompletarTicketComponent implements OnInit {
  ticket: Tickets;
  uploadedFiles: Array < File > ;
  closeResult: string;
  preguntasArray:Preguntas[]=[]

  constructor(
    private modalService: NgbModal,
    public modal: NgbActiveModal,
    private http: HttpClient,
    public ticketService:TicketService,
    public preguntasService:PreguntasService
  ) { }

  ngOnInit(): void {
    this.getPreguntas();
  }

  getPreguntas(){
    this.preguntasService.getPreguntas().subscribe(
      (preguntas)=>{
        for(let i=0;i<preguntas.length;i++)
        if(preguntas[i].area==localStorage.getItem('AREA'))
        {
          this.preguntasArray.push(preguntas[i])
        }
      },
      (err)=>
      {
        if(err)
        {
          console.log(err)
        }
      }
    )
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }
  upload() {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.http.post('/api/upload', formData)
    .subscribe((response) => {
         console.log('response received is ', response);
    })
}
  close(){
    this.modal.close();
  }
  completarTicket(id:number,descripcionCompletado:string)
  {
    this.ticketService.completarTicket(id,descripcionCompletado).subscribe(
      ()=>{
        console.log("Ticket Completado con exito")
        this.ticketService.getTickets();
      },
      (err)=>{
        if(err){
          console.log("Error al completar Ticket: "+err.message)
        }
      },
      ()=>{
        console.log("Finaliza el updatye")
      },
    )
  }

  openMini(exito) {
  
    this.modalService.open(exito,{ size: 'sm' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
  }
}
