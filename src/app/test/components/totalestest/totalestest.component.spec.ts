import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalestestComponent } from './totalestest.component';

describe('TotalesgruaComponent', () => {
  let component: TotalestestComponent;
  let fixture: ComponentFixture<TotalestestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalestestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalestestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
