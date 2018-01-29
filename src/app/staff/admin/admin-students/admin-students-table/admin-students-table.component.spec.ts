/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminStudentsTableComponent } from './admin-students-table.component';
import { MatRadioModule, MatTableModule, MatPaginatorModule, MatDialog } from '@angular/material';
import { AdminService } from '../../admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AdminStudentsTableComponent', () => {
  let component: AdminStudentsTableComponent;
  let fixture: ComponentFixture<AdminStudentsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStudentsTableComponent],
      imports: [
        MatRadioModule,
        MatTableModule,
        MatPaginatorModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        AdminService,
        {
          provide: MatDialog,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
