/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StaffProfileDetailsComponent } from './staff-profile-details.component';
import { MatIconModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { StaffService } from '../../staff.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StaffProfileDetailsComponent', () => {
  let component: StaffProfileDetailsComponent;
  let fixture: ComponentFixture<StaffProfileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffProfileDetailsComponent ],
      imports: [
        MatIconModule,
        MatButtonModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        StaffService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
