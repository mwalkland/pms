/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentCreateComponent } from './student-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule, MatAutocompleteModule, MatCheckboxModule, MatSelectModule, MatDialogRef, MatDialogModule, MatInputModule
} from '@angular/material';
import { StudentService } from '../student.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StudentCreateComponent', () => {
  let component: StudentCreateComponent;
  let fixture: ComponentFixture<StudentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentCreateComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatSelectModule,
        MatDialogModule,
        HttpClientTestingModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        StudentService
        // {
        //   provide: MatDialogRef,
        //   useValue: {}
        // }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
