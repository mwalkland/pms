import { HttpClientModule } from '@angular/common/http';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentProjectsListComponent } from './student-projects-list.component';
import { StudentService } from 'app/student/student.service';

describe('StudentProjectsListComponent', () => {
  let component: StudentProjectsListComponent;
  let fixture: ComponentFixture<StudentProjectsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProjectsListComponent ],
      imports: [
        HttpClientModule
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
