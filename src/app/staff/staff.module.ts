import { AuthModule } from '../auth/auth.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { StaffHeaderComponent } from './staff-header/staff-header.component';
import { MatListModule } from '@angular/material';
import { StaffRoutingModule } from 'app/staff/staff.routing';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    StaffRoutingModule,
    AuthModule
  ],
  declarations: [StaffComponent,
    StaffHeaderComponent
]
})
export class StaffModule { }