import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MatAutocompleteTrigger, MatCheckbox, MatDialog, MatSelect } from '@angular/material';
import { StudentService } from '../student.service';
import { Project } from '../../core/project.model';
import { User } from '../../auth/user.model';
import { StudentCreateSuggestedStaffComponent } from './student-create-suggested-staff/student-create-suggested-staff.component';
import { StudentCreateConfirmDialogComponent } from './student-create-confirm-dialog/student-create-confirm-dialog.component';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  form: FormGroup;
  filteredAreas: Observable<string[]>;
  areaCtrl: FormControl;
  @ViewChild(MatAutocompleteTrigger) autoComplete: MatAutocompleteTrigger;
  @ViewChild(FormGroupDirective) myForm;
  @ViewChild('software') softwareCheckbox: MatCheckbox;
  @ViewChild('research') researchCheckbox: MatCheckbox;
  @ViewChild('staffSelectBox') staffSelectBox: MatSelect;
  areaList: string[];
  staffList: User[];
  projectChosen = false;

  constructor(private builder: FormBuilder,
    public dialog: MatDialog,
    private studentService: StudentService,
  ) {

    this.form = this.builder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      areas: this.builder.array([], Validators.required),
      type: this.builder.array([], Validators.required),
      staffEmail: ['', Validators.required]
    });

    this.areaCtrl = new FormControl();
    this.studentService.getSuggestedAreas().subscribe((areas: string[]) => {
      this.areaList = areas;
      this.filteredAreas = this.areaCtrl.valueChanges.startWith('').map(area => area ? this.filterAreas(area) : this.areaList.slice());
    });

  }

  ngOnInit() {
    this.projectChosen = this.studentService.hasProjectChosen();
    this.studentService.getStaff().subscribe((staffList: User[]) => {
      this.staffList = staffList;
    });
    this.studentService.selectStaffMember.subscribe((staff: User) => {
      this.form.patchValue({ staffEmail: staff.email });
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
    const values: { name: string, description: string, areas: string[], type: string[], staffEmail: string } = this.form.value;
    let type: string;
    if (values.type.length === 2) {
      type = 'Both';
    } else {
      type = values.type[0];
    }
    const staff: User = this.staffList.filter((s) => {
      return s.email = values.staffEmail;
    })[0];

    const project = new Project(
      undefined,
      values.name,
      values.description,
      type,
      undefined,
      values.areas,
      staff
    );
    this.dialog.open(StudentCreateConfirmDialogComponent, {
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

  getStaffSuggestions() {
    this.dialog.open(StudentCreateSuggestedStaffComponent, {
      data: {
        areas: this.form.get('areas').value,
        staff: this.staffList
      }
    })
  }

}
