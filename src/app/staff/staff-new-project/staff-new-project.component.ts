import { map } from 'rxjs/operator/map';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit, state, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatAutocomplete, MatAutocompleteTrigger, MatDialog, MatCheckbox } from '@angular/material';
import { startWith } from 'rxjs/operator/startWith';
import { StaffService } from '../staff.service';
import { Project } from '../../core/project.model';
import { StaffNewProjectConfirmDialogComponent } from './staff-new-project-confirm-dialog/staff-new-project-confirm-dialog.component';

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
  @ViewChild('software') softwareCheckbox: MatCheckbox;
  @ViewChild('research') researchCheckbox: MatCheckbox;
  areaList: string[];
  projectCreated = false;

  constructor(private builder: FormBuilder, public dialog: MatDialog, private staffService: StaffService) {
    this.form = this.builder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      maxStudents: [''],
      areas: this.builder.array([], Validators.required),
      type: this.builder.array([], Validators.required)
    });
    this.areaCtrl = new FormControl();
    this.staffService.getSuggestedAreas().subscribe((areas: string[]) => {
      this.areaList = areas;
      this.filteredAreas = this.areaCtrl.valueChanges.startWith('').map(area => area ? this.filterAreas(area) : this.areaList.slice());
    });
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
        const typeArray = (<FormArray>this.form.get('type'));
        length = typeArray.length;
        for (const area in typeArray) {
          if (typeArray.hasOwnProperty(area)) {
            typeArray.removeAt(0);
          }
        }
      }
      this.projectCreated = true;
      if (this.softwareCheckbox.checked) {
        this.softwareCheckbox.toggle();
      }
      if (this.researchCheckbox.checked) {
        this.researchCheckbox.toggle();
      }
    });
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
    let type;
    if (values.type.length === 2) {
      type = 'Both';
    } else {
      type = values.type[0];
    }
    const project = new Project(
      null,
      values.name,
      values.description,
      type,
      values.maxStudents,
      values.areas
    );
    this.dialog.open(StaffNewProjectConfirmDialogComponent, {
      data: { project: project }
    });

  }

  removeArea(index: number) {
    (<FormArray>this.form.get('areas')).removeAt(index);
  }

  onChangeCheckbox(type: string, isChecked: boolean) {
    const typeArray = <FormArray>this.form.controls.type;
    if (isChecked) {
      typeArray.push(new FormControl(type));
    } else {
      const index = typeArray.controls.findIndex(x => x.value === type);
      typeArray.removeAt(index);
    }
  }

}
