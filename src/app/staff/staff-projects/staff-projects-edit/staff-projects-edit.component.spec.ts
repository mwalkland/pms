/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StaffProjectsEditComponent } from './staff-projects-edit.component';
import { ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import {
  MatCheckboxModule, MatFormFieldModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteModule, MatInputModule
} from '@angular/material';
import { StaffService } from '../../staff.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Project } from '../../../core/project.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StaffProjectsEditComponent', () => {
  let component: StaffProjectsEditComponent;
  let fixture: ComponentFixture<StaffProjectsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaffProjectsEditComponent],
      imports: [
        ReactiveFormsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatDialogModule,
        MatAutocompleteModule,
        HttpClientTestingModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        StaffService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { project: new Project('', '', '', 'Both', 1, []) }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProjectsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('addArea adds to the forms array', () => {
    expect(component.areas.length).toEqual(0);
    component.addArea('area');
    component.addArea('area2');
    expect(component.areas.value).toContain('area');
    expect(component.areas.value).toContain('area2');
  });

  it('removeArea removes element from the forms array', () => {
    (<FormArray>component.form.get('areas')).insert(0, new FormControl('one'));
    (<FormArray>component.form.get('areas')).insert(0, new FormControl('two'));
    (<FormArray>component.form.get('areas')).insert(0, new FormControl('three'));
    component.removeArea(1);
    expect(component.areas.value).toContain('one');
    expect(component.areas.value).toContain('three');
    expect(component.areas.value).not.toContain('two');
  });

  it('onChangeCheckbox correctly handles checking', () => {
    expect((<FormArray>component.form.get('type').value).length).toEqual(2);
    component.onChangeCheckbox('type', true);
    expect(component.form.get('type').value).toContain('type');
    expect((<FormArray>component.form.get('type').value).length).toEqual(3);
  });

  it('onChangeCheckbox correctly handles unchecking', () => {
    (<FormArray>component.form.get('type')).insert(0, new FormControl('type1'));
    (<FormArray>component.form.get('type')).insert(0, new FormControl('type2'));

    component.onChangeCheckbox('type1', false);
    expect(component.form.get('type').value).toContain('type2');
    expect(component.form.get('type').value).not.toContain('type1');
  });
});
