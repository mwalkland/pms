/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StaffProfileComponent } from './staff-profile.component';
import { StaffService } from '../staff.service';
import { StaffModule } from '../staff.module';
import { StaffProfileConfirmedComponent } from './staff-profile-confirmed/staff-profile-confirmed.component';
import { StaffProfileRequestsComponent } from './staff-profile-requests/staff-profile-requests.component';
import { StaffProfileDetailsComponent } from './staff-profile-details/staff-profile-details.component';
import { MatExpansionModule, MatIconModule, MatDialogModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoreModule } from '../../core/core.module';

describe('StaffProfileComponent', () => {
  let component: StaffProfileComponent;
  let fixture: ComponentFixture<StaffProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StaffProfileComponent,
        StaffProfileConfirmedComponent,
        StaffProfileRequestsComponent,
        StaffProfileDetailsComponent
      ],
      imports: [
        MatExpansionModule,
        MatIconModule,
        HttpClientTestingModule,
        MatDialogModule,
        CoreModule
      ],
      providers: [
        StaffService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
