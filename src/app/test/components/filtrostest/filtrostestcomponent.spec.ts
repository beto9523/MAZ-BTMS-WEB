import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrostestComponent } from './filtrostest.component';



describe('FiltrosgruaComponent', () => {
  let component: FiltrostestComponent;
  let fixture: ComponentFixture<FiltrostestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltrostestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltrostestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
