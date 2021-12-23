import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  mensaje:string;
  alertHeader:string;

  constructor(public modal: NgbActiveModal,) { }

  ngOnInit(): void {
  }

}
