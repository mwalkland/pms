/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StaffProfileConfirmedComponent } from './staff-profile-confirmed.component';
import { MatExpansionModule } from '@angular/material';
import { StaffService } from '../../staff.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StaffProfileConfirmedComponent', () => {
  let component: StaffProfileConfirmedComponent;
  let fixture: ComponentFixture<StaffProfileConfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffProfileConfirmedComponent ],
      imports: [
        MatExpansionModule,
        HttpClientTestingModule
      ],
      providers: [
        StaffService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProfileConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
