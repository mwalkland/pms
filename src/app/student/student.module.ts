import { StudentRoutingModule } from './student.routing';
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
import { StudentProjectsListComponent } from './student-projects/student-projects-list/student-projects-list.component';
import {
  MatListModule,
  MatTableModule,
  MatSortModule,
  MatDialogModule,
  MatButtonModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatInputModule,
  MatTooltipModule,
  MatExpansionModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { StudentHomeComponent } from './student-home/student-home.component';
import {
  StudentProjectsConfirmationComponent
} from './student-projects/student-projects-confirmation/student-projects-confirmation.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import {
  StudentCreateSuggestedStaffComponent
} from './student-create/student-create-suggested-staff/student-create-suggested-staff.component';
import {
  StudentProjectsTableDialogComponent
} from './student-projects/student-projects-table/student-projects-table-dialog/student-projects-table-dialog.component';
import {
  StudentProjectsTableDialogConfirmComponent
  // tslint:disable-next-line:max-line-length
} from './student-projects/student-projects-table/student-projects-table-dialog/student-projects-table-dialog-confirm/student-projects-table-dialog-confirm.component';
import { StudentMyProjectComponent } from './student-my-project/student-my-project.component';
import {
  StudentCreateConfirmDialogComponent
} from './student-create/student-create-confirm-dialog/student-create-confirm-dialog.component';

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
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTooltipModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  exports: [
    StudentHeaderComponent
  ],
  declarations: [
    StudentComponent,
    StudentHeaderComponent,
    StudentProjectsComponent,
    StudentProjectsListComponent,
    StudentProjectsTableComponent,
    StudentHomeComponent,
    StudentProjectsTableDialogComponent,
    StudentProjectsTableDialogConfirmComponent,
    StudentProjectsConfirmationComponent,
    StudentCreateComponent,
    StudentCreateSuggestedStaffComponent,
    StudentCreateConfirmDialogComponent,
    StudentMyProjectComponent
  ],
  providers: [
    StudentService
  ],
  entryComponents: [
    StudentProjectsTableDialogComponent,
    StudentProjectsTableDialogConfirmComponent,
    StudentCreateSuggestedStaffComponent,
    StudentCreateConfirmDialogComponent
  ]
})
export class StudentModule { }