import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcumpAgainComponent } from './breadcump-again.component';

describe('BreadcumpAgainComponent', () => {
  let component: BreadcumpAgainComponent;
  let fixture: ComponentFixture<BreadcumpAgainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcumpAgainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreadcumpAgainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
