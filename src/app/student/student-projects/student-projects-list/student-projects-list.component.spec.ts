import { HttpClientModule } from '@angular/common/http';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentProjectsListComponent } from './student-projects-list.component';
import { StudentService } from '../../student.service';
import { MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StudentProjectsListComponent', () => {
  let component: StudentProjectsListComponent;
  let fixture: ComponentFixture<StudentProjectsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentProjectsListComponent],
      imports: [
        HttpClientTestingModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [
        StudentService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
