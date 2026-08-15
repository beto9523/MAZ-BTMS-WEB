import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordContainer } from './change-password.container';

describe('ChangePasswordContainer', () => {
  let component: ChangePasswordContainer;
  let fixture: ComponentFixture<ChangePasswordContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
