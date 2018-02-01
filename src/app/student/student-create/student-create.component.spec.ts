/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentCreateComponent } from './student-create.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import {
  MatFormFieldModule, MatAutocompleteModule, MatCheckboxModule, MatSelectModule, MatDialogRef, MatDialogModule, MatInputModule
} from '@angular/material';
import { StudentService } from '../student.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../../core/core.module';
import { FormArray } from '@angular/forms';

describe('StudentCreateComponent', () => {
  let component: StudentCreateComponent;
  let fixture: ComponentFixture<StudentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentCreateComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatSelectModule,
        MatDialogModule,
        HttpClientTestingModule,
        MatInputModule,
        BrowserAnimationsModule,
        CoreModule
      ],
      providers: [
        StudentService
      ]
    })
      .compileComponents();

    const store = { user: JSON.stringify({ name: 'name', projectChosen: true }) };

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return store[key] || null;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCreateComponent);
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
    expect((<FormArray>component.form.get('type').value).length).toEqual(0);
    component.onChangeCheckbox('type', true);
    expect(component.form.get('type').value).toContain('type');
  });

  it('onChangeCheckbox correctly handles unchecking', () => {
    (<FormArray>component.form.get('type')).insert(0, new FormControl('type1'));
    (<FormArray>component.form.get('type')).insert(0, new FormControl('type2'));

    component.onChangeCheckbox('type1', false);
    expect(component.form.get('type').value).toContain('type2');
    expect(component.form.get('type').value).not.toContain('type1');
  });
});
