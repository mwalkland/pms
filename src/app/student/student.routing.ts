import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentComponent } from './student.component';
import { AuthGuard } from './../auth/guards/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StudentProjectsComponent } from 'app/student/student-projects/student-projects.component';
import { StudentStaffComponent } from 'app/student/student-staff/student-staff.component';

const studentRoutes: Routes = [
  {
    path: 'student',
    component: StudentComponent,
    children: [
      {
        path: '',
        component: StudentHomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'projects',
        component: StudentProjectsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'stafflist',
        component: StudentStaffComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(studentRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [

  ]
})
export class StudentRoutingModule {

}