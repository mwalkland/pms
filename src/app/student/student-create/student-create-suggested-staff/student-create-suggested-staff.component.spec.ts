/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentCreateSuggestedStaffComponent } from './student-create-suggested-staff.component';

describe('StudentCreateSuggestedStaffComponent', () => {
  let component: StudentCreateSuggestedStaffComponent;
  let fixture: ComponentFixture<StudentCreateSuggestedStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCreateSuggestedStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCreateSuggestedStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
