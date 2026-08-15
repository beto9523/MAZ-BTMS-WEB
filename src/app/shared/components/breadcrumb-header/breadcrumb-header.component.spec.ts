import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbHeaderComponent } from './breadcrumb-header.component';

describe('BreadcrumbHeaderComponent', () => {
  let component: BreadcrumbHeaderComponent;
  let fixture: ComponentFixture<BreadcrumbHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreadcrumbHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
