import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevosTicketsComponent } from './nuevos-tickets.component';

describe('NuevosTicketsComponent', () => {
  let component: NuevosTicketsComponent;
  let fixture: ComponentFixture<NuevosTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevosTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevosTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
