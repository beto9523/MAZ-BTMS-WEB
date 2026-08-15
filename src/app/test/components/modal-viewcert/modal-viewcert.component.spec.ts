import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewcertComponent } from './modal-viewcert.component';

describe('ModalViewcertComponent', () => {
  let component: ModalViewcertComponent;
  let fixture: ComponentFixture<ModalViewcertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalViewcertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalViewcertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
