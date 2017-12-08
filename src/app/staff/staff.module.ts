import { AuthModule } from '../auth/auth.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { StaffHeaderComponent } from './staff-header/staff-header.component';
import { MatListModule } from '@angular/material';
import { StaffRoutingModule } from 'app/staff/staff.routing';
import { CoreModule } from 'app/core/core.module';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { StaffNewProjectComponent } from './staff-new-project/staff-new-project.component';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    StaffRoutingModule,
    AuthModule,
    CoreModule
  ],
  declarations: [StaffComponent,
    StaffHeaderComponent,
    StaffHomeComponent,
    StaffNewProjectComponent
]
})
export class StaffModule { }