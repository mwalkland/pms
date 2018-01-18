/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentProjectsTableComponent } from './student-projects-table.component';
import { MatDialogModule, MatTableModule } from '@angular/material';
import { StudentService } from '../../student.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StudentProjectsTableComponent', () => {
  let component: StudentProjectsTableComponent;
  let fixture: ComponentFixture<StudentProjectsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentProjectsTableComponent],
      imports: [
        MatTableModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        StudentService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProjectsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
