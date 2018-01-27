import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteTrigger, MatCheckbox } from '@angular/material';
import { StaffNewProjectComponent } from '../../staff-new-project/staff-new-project.component';
import { Project } from '../../../core/project.model';
import { FormGroup } from '@angular/forms/src/model';
import { Validators, FormBuilder, FormControl, FormGroupDirective, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { StaffService } from '../../staff.service';

@Component({
  selector: 'app-staff-projects-edit',
  templateUrl: './staff-projects-edit.component.html',
  styleUrls: ['./staff-projects-edit.component.css']
})
export class StaffProjectsEditComponent implements OnInit {
  project: Project;
  form: FormGroup;
  filteredAreas: Observable<string[]>;
  areaCtrl: FormControl;
  @ViewChild(MatAutocompleteTrigger) autoComplete: MatAutocompleteTrigger;
  @ViewChild(FormGroupDirective) myForm;
  @ViewChild('software') softwareCheckbox: MatCheckbox;
  @ViewChild('research') researchCheckbox: MatCheckbox;
  areaList: string[];

  constructor(public dialogRef: MatDialogRef<StaffNewProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project },
    private builder: FormBuilder,
    private staffService: StaffService) {
    this.project = data.project;
  }

  ngOnInit() {
    let type: string[];
    if (this.project.type === 'Both') {
      this.researchCheckbox.checked = true;
      this.softwareCheckbox.checked = true;
      type = ['Software Engineering', 'Research-based'];
    } else if (this.project.type === 'Research-based') {
      this.researchCheckbox.checked = true;
      type = ['Research-based'];
    } else if (this.project.type === 'Software Engineering') {
      this.softwareCheckbox.checked = true;
      type = ['Software Engineering'];
    }

    this.form = this.builder.group({
      name: [this.project.name, Validators.required],
      description: [this.project.description, Validators.required],
      maxStudents: [this.project.maxStudents],
      areas: this.builder.array(this.project.areas, Validators.required),
      type: this.builder.array(type, Validators.required)
    });


    this.areaCtrl = new FormControl();
    this.staffService.getSuggestedAreas().subscribe((areas: string[]) => {
      this.areaList = areas;
      this.filteredAreas = this.areaCtrl.valueChanges.startWith('').map(area => area ? this.filterAreas(area) : this.areaList.slice());
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

  onSave() {
    const values = this.form.value;
    let type;
    if (values.type.length === 2) {
      type = 'Both';
    } else {
      type = values.type[0];
    }
    const project = new Project(
      this.project.id,
      values.name,
      values.description,
      type,
      values.maxStudents,
      values.areas
    );
    this.staffService.updateStaffProject(project).subscribe(result => {
      const updatedProject = result['project'];
      this.staffService.updateProjectInList.next(new Project(
        updatedProject._id,
        updatedProject.name,
        updatedProject.description,
        updatedProject.type,
        updatedProject.maxStudents,
        updatedProject.areas
      ));
    });
  }

}
