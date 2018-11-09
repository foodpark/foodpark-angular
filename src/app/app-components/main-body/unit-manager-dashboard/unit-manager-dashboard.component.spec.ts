import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitManagerDashboardComponent } from './unit-manager-dashboard.component';

describe('UnitManagerDashboardComponent', () => {
  let component: UnitManagerDashboardComponent;
  let fixture: ComponentFixture<UnitManagerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitManagerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitManagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
