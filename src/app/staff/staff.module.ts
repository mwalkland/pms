
import { AuthModule } from '../auth/auth.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { StaffHeaderComponent } from './staff-header/staff-header.component';
import {
  MatListModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule,
  MatButtonModule, MatIconModule, MatDialogModule, MatCheckboxModule
} from '@angular/material';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { StaffNewProjectComponent } from './staff-new-project/staff-new-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  StaffConfirmProjectDialogComponent,
} from './staff-new-project/staff-confirm-project-dialog/staff-confirm-project-dialog.component';
import { StaffRoutingModule } from './staff.routing';
import { CoreModule } from '../core/core.module';
import { StaffService } from './staff.service';

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
    MatDialogModule,
    MatCheckboxModule
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