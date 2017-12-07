import { StudentProjectsService } from './student-projects/student-projects.service';
import { StudentProjectsTableComponent } from './student-projects/student-projects-table/student-projects-table.component';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './../auth/auth.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { StudentHeaderComponent } from './student-header/student-header.component';
import { StudentProjectsComponent } from './student-projects/student-projects.component';
import { StudentStaffComponent } from './student-staff/student-staff.component';
import { StudentRoutingModule } from 'app/student/student.routing';
import { StudentProjectsListComponent } from './student-projects/student-projects-list/student-projects-list.component';
import { MatListModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { StudentHomeComponent } from './student-home/student-home.component';



@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    StudentRoutingModule,
    AuthModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule
  ],
  exports: [
    StudentHeaderComponent
  ],
  declarations: [
    StudentComponent,
    StudentHeaderComponent,
    StudentProjectsComponent,
    StudentStaffComponent,
    StudentProjectsListComponent,
    StudentProjectsTableComponent,
    StudentHomeComponent
],
  providers: [
    StudentProjectsService
  ]
})
export class StudentModule { }