import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing';
import { CoreModule } from '../../core/core.module';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { AdminStaffComponent } from './admin-staff/admin-staff.component';
import { AdminService } from './admin.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule
  ],
  declarations: [
    AdminComponent,
    AdminListComponent,
    AdminStudentsComponent,
    AdminStaffComponent
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }