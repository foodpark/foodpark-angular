import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodparkManagerDashboardComponent } from './foodpark-manager-dashboard.component';

describe('FoodparkManagerDashboardComponent', () => {
  let component: FoodparkManagerDashboardComponent;
  let fixture: ComponentFixture<FoodparkManagerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodparkManagerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodparkManagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
