/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentHeaderComponent } from './student-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatListModule } from '@angular/material';
import { AuthModule } from '../../auth/auth.module';
import { AuthService } from '../../auth/auth.service';

describe('StudentHeaderComponent', () => {
  let component: StudentHeaderComponent;
  let fixture: ComponentFixture<StudentHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentHeaderComponent ],
      imports: [
        RouterTestingModule,
        MatListModule,
        AuthModule
      ],
      providers: [
        AuthService
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
