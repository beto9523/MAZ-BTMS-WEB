import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrdersComponent } from './modal-orders.component';

describe('ModalOrdersComponent', () => {
  let component: ModalOrdersComponent;
  let fixture: ComponentFixture<ModalOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
