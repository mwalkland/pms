/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentCreateConfirmDialogComponent } from './student-create-confirm-dialog.component';
import { StudentService } from '../../student.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatFormFieldModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Project } from '../../../core/project.model';

describe('StudentCreateConfirmDialogComponent', () => {
  let component: StudentCreateConfirmDialogComponent;
  let fixture: ComponentFixture<StudentCreateConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentCreateConfirmDialogComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        RouterTestingModule,
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
          useValue: { project: new Project(null, null, null, null, null, []) }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCreateConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
