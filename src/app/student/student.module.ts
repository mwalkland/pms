import {
  StudentProjectsDialogConfirmComponent,
  // tslint:disable-next-line:max-line-length
} from './student-projects/student-projects-table/student-projects-dialog/student-projects-dialog-confirm/student-projects-dialog-confirm.component';
import { StudentRoutingModule } from './student.routing';
import {
  StudentProjectsDialogComponent,
} from './student-projects/student-projects-table/student-projects-dialog/student-projects-dialog.component';
import { StudentService } from './student.service';
import { CoreModule } from '../core/core.module';
import { StudentProjectsTableComponent } from './student-projects/student-projects-table/student-projects-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './../auth/auth.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { StudentHeaderComponent } from './student-header/student-header.component';
import { StudentProjectsComponent } from './student-projects/student-projects.component';
import { StudentStaffComponent } from './student-staff/student-staff.component';
import { StudentProjectsListComponent } from './student-projects/student-projects-list/student-projects-list.component';
import {
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatButtonModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatInputModule
} from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { StudentHomeComponent } from './student-home/student-home.component';
import {
  StudentProjectsConfirmationComponent
} from './student-projects/student-projects-confirmation/student-projects-confirmation.component';
import { StudentCreateComponent } from './student-create/student-create.component';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    StudentRoutingModule,
    AuthModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    CoreModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatInputModule
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
    StudentHomeComponent,
    StudentProjectsDialogComponent,
    StudentProjectsDialogConfirmComponent,
    StudentProjectsConfirmationComponent,
    StudentCreateComponent
  ],
  providers: [
    StudentService
  ],
  entryComponents: [
    StudentProjectsDialogComponent,
    StudentProjectsDialogConfirmComponent
  ]
})
export class StudentModule { }