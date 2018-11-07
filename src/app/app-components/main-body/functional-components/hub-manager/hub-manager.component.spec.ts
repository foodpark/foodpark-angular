import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubManagerComponent } from './hub-manager.component';

describe('HubManagerComponent', () => {
  let component: HubManagerComponent;
  let fixture: ComponentFixture<HubManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
