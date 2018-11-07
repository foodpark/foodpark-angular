import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubManagerDashboardComponent } from './hub-manager-dashboard.component';

describe('HubManagerDashboardComponent', () => {
  let component: HubManagerDashboardComponent;
  let fixture: ComponentFixture<HubManagerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubManagerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubManagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
