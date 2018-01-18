/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentCreateSuggestedStaffComponent } from './student-create-suggested-staff.component';
import { MatExpansionModule, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material';
import { StudentService } from '../../student.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from '../../../auth/user.model';

describe('StudentCreateSuggestedStaffComponent', () => {
  let component: StudentCreateSuggestedStaffComponent;
  let fixture: ComponentFixture<StudentCreateSuggestedStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentCreateSuggestedStaffComponent],
      imports: [
        MatExpansionModule,
        MatDialogModule,
        HttpClientTestingModule
      ],
      providers: [
        StudentService,
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            areas: ['test'], staff: [new User('email', null, null, null, null, null, {
              first: '1', second: '2', third: '3', fourth: '4', fifth: '5'
            })]
          }
        },
      ]
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
