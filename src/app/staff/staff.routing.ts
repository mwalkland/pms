import { StaffNewProjectComponent } from './staff-new-project/staff-new-project.component';
import { AuthGuard } from '../auth/guards/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StaffComponent } from './staff.component';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';
import { StaffProjectsComponent } from './staff-projects/staff-projects.component';

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
      },
      {
        path: 'profile',
        component: StaffProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'projects',
        component: StaffProjectsComponent,
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