/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StaffProfileDetailsEditComponent } from './staff-profile-details-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule, MatAutocompleteModule, MatDialogModule, MatFormFieldModule, MAT_DIALOG_DATA, MatDialogRef
} from '@angular/material';
import { StaffService } from '../../../staff.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StaffProfileDetailsEditComponent', () => {
  let component: StaffProfileDetailsEditComponent;
  let fixture: ComponentFixture<StaffProfileDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaffProfileDetailsEditComponent],
      imports: [
        FormsModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        StaffService,
        {
          provide: MAT_DIALOG_DATA,
          useValue: { areas: [] }
        },
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProfileDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
