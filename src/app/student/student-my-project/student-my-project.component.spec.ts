/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentMyProjectComponent } from './student-my-project.component';
import { StudentService } from '../student.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoreModule } from '../../core/core.module';

describe('StudentMyProjectComponent', () => {
  let component: StudentMyProjectComponent;
  let fixture: ComponentFixture<StudentMyProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMyProjectComponent ],
      imports: [
        HttpClientTestingModule,
        CoreModule
      ],
      providers: [
        StudentService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMyProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
