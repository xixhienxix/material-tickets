import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletarTicketComponent } from './completar-ticket.component';

describe('CompletarTicketComponent', () => {
  let component: CompletarTicketComponent;
  let fixture: ComponentFixture<CompletarTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletarTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletarTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
