import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppointmentDetailComponent } from './appointment-detail.component';

describe('AppointmentDetailComponent', () => {
  let component: AppointmentDetailComponent;
  let fixture: ComponentFixture<AppointmentDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
