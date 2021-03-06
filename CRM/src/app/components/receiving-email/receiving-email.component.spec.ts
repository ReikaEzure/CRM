import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReceivingEmailComponent } from './receiving-email.component';

describe('ReceivingEmailComponent', () => {
  let component: ReceivingEmailComponent;
  let fixture: ComponentFixture<ReceivingEmailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivingEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivingEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
