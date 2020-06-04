import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDeatilComponent } from './client-deatil.component';

describe('ClientDeatilComponent', () => {
  let component: ClientDeatilComponent;
  let fixture: ComponentFixture<ClientDeatilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDeatilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDeatilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
