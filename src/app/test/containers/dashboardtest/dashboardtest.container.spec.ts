import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardtestContainer } from './dashboardtest.container';

describe('DashboardgruasComponent', () => {
  let component: DashboardtestContainer;
  let fixture: ComponentFixture<DashboardtestContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardtestContainer]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardtestContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
