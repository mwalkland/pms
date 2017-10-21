import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentHeaderComponent } from './student-header/student-header.component';
import { MatListModule } from '@angular/material';
import { StudentProjectsComponent } from './student-projects/student-projects.component';
import { StudentStaffComponent } from './student-staff/student-staff.component';
import { StudentRoutingModule } from 'app/student/student.routing';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    StudentRoutingModule
  ],
  exports: [
    StudentHeaderComponent
  ],
  declarations: [
    StudentComponent,
    StudentHomeComponent,
    StudentHeaderComponent,
    StudentProjectsComponent,
    StudentStaffComponent
]
})
export class StudentModule { }