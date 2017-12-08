import { StaffNewProjectComponent } from './staff-new-project/staff-new-project.component';
import { AuthGuard } from '../auth/guards/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StaffComponent } from 'app/staff/staff.component';
import { StaffHomeComponent } from 'app/staff/staff-home/staff-home.component';

const staffRoutes: Routes = [
  {
    path: '',
    component: StaffComponent,
    children: [
      {
        path: '',
        component: StaffHomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'new',
        component: StaffNewProjectComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(staffRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [

  ]
})
export class StaffRoutingModule {

}