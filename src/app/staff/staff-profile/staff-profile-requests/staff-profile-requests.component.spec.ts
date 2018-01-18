/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StaffProfileRequestsComponent } from './staff-profile-requests.component';
import { StaffService } from '../../staff.service';
import { MatExpansionModule, MatDialogModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StaffProfileRequestsComponent', () => {
  let component: StaffProfileRequestsComponent;
  let fixture: ComponentFixture<StaffProfileRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffProfileRequestsComponent ],
      imports: [
        MatExpansionModule,
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
    fixture = TestBed.createComponent(StaffProfileRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
