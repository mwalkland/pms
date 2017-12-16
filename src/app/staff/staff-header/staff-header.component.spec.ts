import { AuthModule } from '../../auth/auth.module';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StaffHeaderComponent } from './staff-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatListModule } from '@angular/material';

describe('StaffHeaderComponent', () => {
  let component: StaffHeaderComponent;
  let fixture: ComponentFixture<StaffHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffHeaderComponent ],
      imports: [
        RouterTestingModule,
        MatListModule,
        AuthModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
