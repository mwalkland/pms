import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StudentProjectsListComponent } from './student-projects-list/student-projects-list.component';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentProjectsComponent } from './student-projects.component';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { StudentProjectsTableComponent } from './student-projects-table/student-projects-table.component';
import { StudentService } from '../student.service';

describe('StudentProjectsComponent', () => {
  let component: StudentProjectsComponent;
  let fixture: ComponentFixture<StudentProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StudentProjectsComponent,
        StudentProjectsListComponent,
        StudentProjectsTableComponent
      ],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [
        StudentService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
