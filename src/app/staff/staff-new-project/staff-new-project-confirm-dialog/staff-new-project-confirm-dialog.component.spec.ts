/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StaffService } from '../../staff.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef, MAT_DIALOG_DATA, MatFormFieldModule } from '@angular/material';
import { Project } from '../../../core/project.model';
import { StaffNewProjectConfirmDialogComponent } from './staff-new-project-confirm-dialog.component';

describe('StaffNewProjectConfirmDialogComponent', () => {
  let component: StaffNewProjectConfirmDialogComponent;
  let fixture: ComponentFixture<StaffNewProjectConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffNewProjectConfirmDialogComponent ],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule
      ],
      providers: [
        StaffService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {project: new Project(null, '', '', '', 3, ['area'])}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffNewProjectConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
