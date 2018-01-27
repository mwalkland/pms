import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing';
import { CoreModule } from '../../core/core.module';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { AdminStaffComponent } from './admin-staff/admin-staff.component';
import { AdminService } from './admin.service';
import {
  MatTableModule,
  MatSortModule,
  MatRadioModule,
  MatDialogModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';
import { AdminStudentsTableComponent } from './admin-students/admin-students-table/admin-students-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminStaffTableComponent } from './admin-staff/admin-staff-table/admin-staff-table.component';
import {
  AdminStaffTableDialogComponent
} from './admin-staff/admin-staff-table/admin-staff-table-dialog/admin-staff-table-dialog.component';
import {
  AdminStudentsTableDialogComponent
} from './admin-students/admin-students-table/admin-students-table-dialog/admin-students-table-dialog.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminReminderComponent } from './admin-reminder/admin-reminder.component';
import {
  AdminStudentsTableDialogConfirmComponent
  // tslint:disable-next-line:max-line-length
} from './admin-students/admin-students-table/admin-students-table-dialog/admin-students-table-dialog-confirm/admin-students-table-dialog-confirm.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    MatTableModule,
    MatSortModule,
    MatRadioModule,
    FormsModule,
    MatDialogModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminComponent,
    AdminListComponent,
    AdminStudentsComponent,
    AdminStaffComponent,
    AdminStudentsTableComponent,
    AdminStaffTableComponent,
    AdminStaffTableDialogComponent,
    AdminStudentsTableDialogComponent,
    AdminHomeComponent,
    AdminReminderComponent,
    AdminStudentsTableDialogConfirmComponent
  ],
  providers: [
    AdminService
  ],
  entryComponents: [
    AdminStaffTableDialogComponent,
    AdminStudentsTableDialogComponent,
    AdminReminderComponent,
    AdminStudentsTableDialogConfirmComponent
  ]
})
export class AdminModule { }