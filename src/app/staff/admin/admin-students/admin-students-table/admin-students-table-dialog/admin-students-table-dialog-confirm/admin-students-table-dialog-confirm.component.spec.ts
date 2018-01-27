/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AdminStudentsTableDialogConfirmComponent } from './admin-students-table-dialog-confirm.component';


describe('AdminModifyTableDialogConfirmComponent', () => {
  let component: AdminStudentsTableDialogConfirmComponent;
  let fixture: ComponentFixture<AdminStudentsTableDialogConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentsTableDialogConfirmComponent ]
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
