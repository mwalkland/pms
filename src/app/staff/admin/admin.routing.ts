import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { AdminStaffComponent } from './admin-staff/admin-staff.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'students'
        // component: AdminHomeComponent
      },
      {
        path: 'students',
        component: AdminStudentsComponent
      },
      {
        path: 'staff',
        component: AdminStaffComponent
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [

  ]
})
export class AdminRoutingModule {

}