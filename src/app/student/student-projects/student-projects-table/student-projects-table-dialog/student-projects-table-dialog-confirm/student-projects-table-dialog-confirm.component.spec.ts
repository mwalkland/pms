/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { StudentProjectsTableDialogConfirmComponent } from './student-projects-table-dialog-confirm.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatFormFieldModule } from '@angular/material';
import { StudentService } from '../../../../student.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('StudentProjectsTableDialogConfirmComponent', () => {
  let component: StudentProjectsTableDialogConfirmComponent;
  let fixture: ComponentFixture<StudentProjectsTableDialogConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentProjectsTableDialogConfirmComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        MatFormFieldModule
      ],
      providers: [
        StudentService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProjectsTableDialogConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
