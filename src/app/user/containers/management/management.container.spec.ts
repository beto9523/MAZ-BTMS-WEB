import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementContainer } from './management.container';

describe('DashboardComponent', () => {
  let component: ManagementContainer;
  let fixture: ComponentFixture<ManagementContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagementContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
