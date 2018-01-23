/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StaffProjectsEditComponent } from './staff-projects-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCheckboxModule, MatFormFieldModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteModule, MatInputModule
} from '@angular/material';
import { StaffService } from '../../staff.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Project } from '../../../core/project.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StaffProjectsEditComponent', () => {
  let component: StaffProjectsEditComponent;
  let fixture: ComponentFixture<StaffProjectsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaffProjectsEditComponent],
      imports: [
        ReactiveFormsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatDialogModule,
        MatAutocompleteModule,
        HttpClientTestingModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        StaffService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { project: new Project('', '', '', 'Both', 1, []) }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProjectsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
