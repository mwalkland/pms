
import { AuthModule } from '../auth/auth.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { StaffHeaderComponent } from './staff-header/staff-header.component';
import {
  MatListModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule,
  MatButtonModule, MatIconModule, MatDialogModule
} from '@angular/material';
import { StaffRoutingModule } from 'app/staff/staff.routing';
import { CoreModule } from 'app/core/core.module';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { StaffNewProjectComponent } from './staff-new-project/staff-new-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StaffService } from 'app/staff/staff.service';
import {
  StaffConfirmProjectDialogComponent,
} from './staff-new-project/staff-confirm-project-dialog/staff-confirm-project-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    StaffRoutingModule,
    AuthModule,
    CoreModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  declarations: [StaffComponent,
    StaffHeaderComponent,
    StaffHomeComponent,
    StaffNewProjectComponent,
    StaffConfirmProjectDialogComponent
  ],
  providers: [
    StaffService
  ],
  entryComponents: [
    StaffConfirmProjectDialogComponent
  ]
})
export class StaffModule { }