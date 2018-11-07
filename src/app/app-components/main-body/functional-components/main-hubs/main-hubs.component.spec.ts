import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHubsComponent } from './main-hubs.component';

describe('MainHubsComponent', () => {
  let component: MainHubsComponent;
  let fixture: ComponentFixture<MainHubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainHubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
