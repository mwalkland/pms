/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StaffProjectsComponent } from './staff-projects.component';
import { CoreModule } from '../../core/core.module';
import { MatExpansionModule, MatDialogModule } from '@angular/material';
import { StaffService } from '../staff.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StaffProjectsComponent', () => {
  let component: StaffProjectsComponent;
  let fixture: ComponentFixture<StaffProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffProjectsComponent ],
      imports: [
        CoreModule,
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
    fixture = TestBed.createComponent(StaffProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
