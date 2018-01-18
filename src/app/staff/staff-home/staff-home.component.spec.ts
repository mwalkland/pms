/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StaffHomeComponent } from './staff-home.component';

describe('StaffHomeComponent', () => {
  let component: StaffHomeComponent;
  let fixture: ComponentFixture<StaffHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaffHomeComponent]
    })
      .compileComponents();

    const store = { user: JSON.stringify({ name: 'name' }) };

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return store[key] || null;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
