/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StaffConfirmProjectDialogComponent } from './staff-confirm-project-dialog.component';
import { StaffService } from '../../staff.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Project } from '../../../core/project.model';

describe('StaffConfirmProjectDialogComponent', () => {
  let component: StaffConfirmProjectDialogComponent;
  let fixture: ComponentFixture<StaffConfirmProjectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffConfirmProjectDialogComponent ],
      imports: [
        HttpClientTestingModule
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
    fixture = TestBed.createComponent(StaffConfirmProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
