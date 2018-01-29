/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StaffProfileRequestsConfirmComponent } from './staff-profile-requests-confirm.component';
import { StaffService } from '../../../staff.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatFormFieldModule } from '@angular/material';

describe('StaffProfileRequestsConfirmComponent', () => {
  let component: StaffProfileRequestsConfirmComponent;
  let fixture: ComponentFixture<StaffProfileRequestsConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaffProfileRequestsConfirmComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
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
          useValue: {}
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProfileRequestsConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
