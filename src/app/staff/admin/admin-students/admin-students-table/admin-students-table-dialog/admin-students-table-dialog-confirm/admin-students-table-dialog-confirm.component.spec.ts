/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AdminStudentsTableDialogConfirmComponent } from './admin-students-table-dialog-confirm.component';
import { MatFormFieldModule, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AdminService } from '../../../../admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AdminStudentsTableDialogConfirmComponent', () => {
  let component: AdminStudentsTableDialogConfirmComponent;
  let fixture: ComponentFixture<AdminStudentsTableDialogConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentsTableDialogConfirmComponent ],
      imports: [
        MatFormFieldModule,
        MatDialogModule,
        HttpClientTestingModule
      ],
      providers: [
        AdminService,
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentsTableDialogConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
