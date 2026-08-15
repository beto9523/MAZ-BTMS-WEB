import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabletestmanagmentComponent } from './tabletestmanagement.component';


describe('TabletestmanagementComponent', () => {
  let component: TabletestmanagmentComponent;
  let fixture: ComponentFixture<TabletestmanagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabletestmanagmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabletestmanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
