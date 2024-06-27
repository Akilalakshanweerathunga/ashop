import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnAndExchangePolicyComponent } from './return-and-exchange-policy.component';

describe('ReturnAndExchangePolicyComponent', () => {
  let component: ReturnAndExchangePolicyComponent;
  let fixture: ComponentFixture<ReturnAndExchangePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReturnAndExchangePolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnAndExchangePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
