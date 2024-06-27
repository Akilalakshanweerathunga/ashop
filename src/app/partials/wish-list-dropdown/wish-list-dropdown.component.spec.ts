import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListDropdownComponent } from './wish-list-dropdown.component';

describe('WishListDropdownComponent', () => {
  let component: WishListDropdownComponent;
  let fixture: ComponentFixture<WishListDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WishListDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WishListDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
