import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StaffNewProjectComponent } from './staff-new-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatDialogModule, MatCheckboxModule } from '@angular/material';
import { StaffService } from '../staff.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoreModule } from '../../core/core.module';

describe('StaffNewProjectComponent', () => {
  let component: StaffNewProjectComponent;
  let fixture: ComponentFixture<StaffNewProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffNewProjectComponent ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDialogModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        CoreModule
      ],
      providers: [
        StaffService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffNewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
