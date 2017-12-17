import { map } from 'rxjs/operator/map';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit, state, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatAutocomplete, MatAutocompleteTrigger, MatDialog } from '@angular/material';
import { startWith } from 'rxjs/operator/startWith';
import { StaffService } from 'app/staff/staff.service';
import {
  StaffConfirmProjectDialogComponent
} from 'app/staff/staff-new-project/staff-confirm-project-dialog/staff-confirm-project-dialog.component';
import { Project } from 'app/core/project.model';

@Component({
  selector: 'app-staff-new-project',
  templateUrl: './staff-new-project.component.html',
  styleUrls: ['./staff-new-project.component.css']
})
export class StaffNewProjectComponent implements OnInit {

  form: FormGroup;
  filteredAreas: Observable<string[]>;
  areaCtrl: FormControl;
  @ViewChild(MatAutocompleteTrigger) autoComplete: MatAutocompleteTrigger;
  @ViewChild(FormGroupDirective) myForm;
  areaList = [
    'Artificial Intelligence',
    'Networking',
    'Web Development',
    'Neural Networks',
    'Machine Learning',
    'Social Media',
    'Natural Language',
    'Data Mining',
    'Mobile App Development',
    'Computer Vision',
    'Pattern Recognition'
  ];
  projectCreated = false;

  constructor(private builder: FormBuilder, public dialog: MatDialog, private staffService: StaffService) {
    this.form = this.builder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      maxStudents: [''],
      areas: this.builder.array([])
    });
    this.areaCtrl = new FormControl();
    this.filteredAreas = this.areaCtrl.valueChanges.startWith('').map(area => area ? this.filterAreas(area) : this.areaList.slice());
  }

  ngOnInit() {
    this.staffService.resetForm.subscribe(() => {
      if (this.myForm) {
        this.myForm.resetForm();
        const areaArray = (<FormArray>this.form.get('areas'));
        length = areaArray.length;
        for (const area in areaArray) {
          if (areaArray.hasOwnProperty(area)) {
            areaArray.removeAt(0);
          }
        }
      }
      this.projectCreated = true;
    })
  }

  get areas(): FormArray {
    return this.form.get('areas') as FormArray;
  }

  filterAreas(name: string) {
    return this.areaList.filter(
      area => area.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  addArea(name: string) {
    if (!(<string[]>this.areas.value).includes(name) && name !== '') {
      this.areas.insert(0, new FormControl(name));
      this.areaCtrl.reset();
    }
  }

  onSubmit() {
    const values = this.form.value;
    console.log(values);
    const project = new Project(
      values.name,
      values.description,
      values.maxStudents,
      values.areas
    );
    this.dialog.open(StaffConfirmProjectDialogComponent, {
      data: { project: project }
    });

  }

  removeArea(index: number) {
    (<FormArray>this.form.get('areas')).removeAt(index);
  }



}
