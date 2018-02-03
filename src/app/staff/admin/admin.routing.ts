import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { AdminStaffComponent } from './admin-staff/admin-staff.component';
import { AdminAreasComponent } from './admin-areas/admin-areas.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'students'
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