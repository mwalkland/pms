
import { AuthModule } from '../auth/auth.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { StaffHeaderComponent } from './staff-header/staff-header.component';
import {
  MatListModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule,
  MatButtonModule, MatIconModule, MatDialogModule, MatCheckboxModule, MatExpansionModule, MatTooltipModule
} from '@angular/material';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { StaffNewProjectComponent } from './staff-new-project/staff-new-project.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  StaffConfirmProjectDialogComponent,
} from './staff-new-project/staff-confirm-project-dialog/staff-confirm-project-dialog.component';
import { StaffRoutingModule } from './staff.routing';
import { CoreModule } from '../core/core.module';
import { StaffService } from './staff.service';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';
import { StaffProfileDetailsComponent } from './staff-profile/staff-profile-details/staff-profile-details.component';
import { StaffProfileRequestsComponent } from './staff-profile/staff-profile-requests/staff-profile-requests.component';
import { StaffProfileConfirmedComponent } from './staff-profile/staff-profile-confirmed/staff-profile-confirmed.component';
import {
  StaffProfileRequestsConfirmComponent
} from './staff-profile/staff-profile-requests/staff-profile-requests-confirm/staff-profile-requests-confirm.component';
import {
  StaffProfileDetailsEditComponent
} from './staff-profile/staff-profile-details/staff-profile-details-edit/staff-profile-details-edit.component';

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
    MatCheckboxModule,
    MatExpansionModule,
    FormsModule,
    MatTooltipModule
  ],
  declarations: [
    StaffComponent,
    StaffHeaderComponent,
    StaffHomeComponent,
    StaffNewProjectComponent,
    StaffConfirmProjectDialogComponent,
    StaffProfileComponent,
    StaffProfileDetailsComponent,
    StaffProfileRequestsComponent,
    StaffProfileConfirmedComponent,
    StaffProfileRequestsConfirmComponent,
    StaffProfileDetailsEditComponent
  ],
  providers: [
    StaffService
  ],
  entryComponents: [
    StaffConfirmProjectDialogComponent,
    StaffProfileRequestsConfirmComponent,
    StaffProfileDetailsEditComponent
  ]
})
export class StaffModule { }