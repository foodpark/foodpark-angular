import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndEditMainhubComponent } from './add-and-edit-mainhub.component';

describe('AddAndEditMainhubComponent', () => {
  let component: AddAndEditMainhubComponent;
  let fixture: ComponentFixture<AddAndEditMainhubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAndEditMainhubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAndEditMainhubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
