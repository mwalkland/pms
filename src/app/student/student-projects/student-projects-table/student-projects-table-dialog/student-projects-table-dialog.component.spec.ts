/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { StudentProjectsTableDialogComponent } from './student-projects-table-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material';
import { AuthService } from '../../../../auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Project } from '../../../../core/project.model';


describe('StudentProjectsTableDialogComponent', () => {
  let component: StudentProjectsTableDialogComponent;
  let fixture: ComponentFixture<StudentProjectsTableDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentProjectsTableDialogComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { project: new Project(null, '', '', '', 1, ['']) }
        }
      ]
    })
      .compileComponents();

    const store = { user: JSON.stringify({ name: 'name' }) };

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return store[key] || null;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProjectsTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
