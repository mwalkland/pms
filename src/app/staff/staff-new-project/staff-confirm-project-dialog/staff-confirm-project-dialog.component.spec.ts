/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StaffConfirmProjectDialogComponent } from './staff-confirm-project-dialog.component';

describe('StaffConfirmProjectDialogComponent', () => {
  let component: StaffConfirmProjectDialogComponent;
  let fixture: ComponentFixture<StaffConfirmProjectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffConfirmProjectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffConfirmProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
